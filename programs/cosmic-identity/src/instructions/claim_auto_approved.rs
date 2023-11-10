use crate::access_controls::only_influencer::*;
use crate::constants::*;
use crate::errors::ErrorCode;
use crate::events::order_updated::OrderUpdated;
use crate::state::campaign_state::*;
use crate::state::global_state::*;
use crate::state::influencer_state::InfluencerInfo;
use crate::state::point_state::PointState;
use crate::utils::{calculate_month_id, increase_account_size};

use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

#[derive(Accounts)]
#[instruction(campaign_id: u64)]
pub struct ClaimAutoApproved<'info> {
    #[account(mut)]
    pub influencer: Signer<'info>,

    #[account(
        mut,
        seeds = [ GLOBAL_STATE_SEED ],
        bump,
    )]
    pub global_state: Box<Account<'info, GlobalState>>,

    #[account(
        mut,
        seeds = [ CAMPAIGN_STATE_SEED, campaign_id.to_le_bytes().as_ref() ],
        bump,
    )]
    pub campaign_state: Box<Account<'info, CampaignState>>,

    #[account(
        mut,
        seeds = [ INFLUENCER_INFO_SEED, influencer.key().as_ref() ],
        bump,
        constraint = influencer.key() == influencer_info.address @ ErrorCode::InvalidInfluencerAddress,
    )]
    pub influencer_info: Box<Account<'info, InfluencerInfo>>,

    #[account(
        mut,
        seeds = [ POINT_STATE_SEED, global_state.key().as_ref() ],
        bump,
        constraint = global_state.key() == global_point_info.owner @ ErrorCode::InvalidPointStateOwner,
    )]
    pub global_point_info: Box<Account<'info, PointState>>,

    #[account(
        mut,
        seeds = [ POINT_STATE_SEED, influencer.key().as_ref() ],
        bump,
        constraint = influencer.key() == influencer_point_info.owner @ ErrorCode::InvalidPointStateOwner,
    )]
    pub influencer_point_info: Box<Account<'info, PointState>>,

    #[account(
        address = COST_TOKEN_MINT_PUBKEY.parse::<Pubkey>().unwrap()
    )]
    pub cost_token_mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        associated_token::mint = cost_token_mint,
        associated_token::authority = influencer,
    )]
    pub user_token_account: Box<Account<'info, TokenAccount>>,

    /// CHECK: Not dangerous cause using for only cost token vault
    #[account(
        mut,
        seeds = [ GLOBAL_VAULT_SEED ],
        bump,
    )]
    pub global_vault: AccountInfo<'info>,

    #[account(
        mut,
        associated_token::mint = cost_token_mint,
        associated_token::authority = global_vault,
    )]
    pub vault_token_account: Box<Account<'info, TokenAccount>>,

    // system accounts
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[access_control(only_influencer(&ctx.accounts.campaign_state, &ctx.accounts.influencer, campaign_id))]
pub fn handle(ctx: Context<ClaimAutoApproved>, campaign_id: u64) -> Result<()> {
    let global_state = &mut ctx.accounts.global_state;
    let campaign_state = &mut ctx.accounts.campaign_state;
    let influencer_info = &mut ctx.accounts.influencer_info;
    let global_point_info = &mut ctx.accounts.global_point_info.clone();
    let influencer_point_info = &mut ctx.accounts.influencer_point_info.clone();

    require!(
        campaign_state.status == CampaignStatus::OrderFilled,
        ErrorCode::InvalidCampaignStatus
    );

    let now = Clock::get().unwrap().unix_timestamp as u64;

    require!(
        now >= campaign_state.order_completion_time + global_state.approve_period_in_seconds,
        ErrorCode::InvalidAutoApproveTime
    );

    campaign_state.status = CampaignStatus::ResultAutoAproved;
    campaign_state.rating += 100;

    // add rating gain
    // TODO: should check and build partnership
    let mut rating = campaign_state.rating;

    influencer_info.rating += rating;

    let boosted_rating = global_state.get_boosted_value(
        rating,
        influencer_info.boost,
        campaign_state.order_creation_time,
    );

    let month_id = calculate_month_id(campaign_state.order_creation_time);

    if !global_point_info.try_update(month_id, boosted_rating) {
        increase_account_size(
            &mut ctx.accounts.global_point_info.to_account_info(),
            &mut ctx.accounts.influencer.to_account_info(),
            &ctx.accounts.system_program.to_account_info(),
            16, // new point item size
        )?;
        global_point_info.append(month_id, boosted_rating);
    }

    if !influencer_point_info.try_update(month_id, boosted_rating) {
        increase_account_size(
            &mut ctx.accounts.influencer_point_info.to_account_info(),
            &mut ctx.accounts.influencer.to_account_info(),
            &ctx.accounts.system_program.to_account_info(),
            16,
        )?;
        influencer_point_info.append(month_id, boosted_rating);
    }

    // TODO: should consider this func upon implementing Coin Reward distribution
    // campaign_state.collect_fee();

    emit!(OrderUpdated {
        campaign_id: campaign_state.id,
        rating: campaign_state.rating,
        status: campaign_state.status,
        order_completion_time: 0,
    });

    let seeds = &[
        GLOBAL_VAULT_SEED,
        &[*ctx.bumps.get("global_vault").unwrap()],
    ];
    let signer = [&seeds[..]];

    let cpi_accounts = Transfer {
        from: ctx.accounts.vault_token_account.to_account_info().clone(),
        to: ctx.accounts.user_token_account.to_account_info().clone(),
        authority: ctx.accounts.global_vault.to_account_info().clone(),
    };
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.clone().to_account_info(),
            cpi_accounts,
            &signer,
        ),
        campaign_state.price,
    )?;

    Ok(())
}
