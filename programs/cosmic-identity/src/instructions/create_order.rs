use crate::constants::*;
use crate::errors::ErrorCode;
use crate::events::order_created::OrderCreated;
use crate::state::campaign_state::*;
use crate::state::global_state::GlobalState;
use crate::state::influencer_state::InfluencerInfo;
use crate::utils::*;

use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

#[derive(Accounts)]
pub struct CreateOrder<'info> {
    #[account(mut)]
    pub brand: Signer<'info>,

    #[account(
        mut,
        seeds = [ GLOBAL_STATE_SEED ],
        bump,
    )]
    pub global_state: Box<Account<'info, GlobalState>>,

    #[account(
        init,
        space = CampaignState::LEN,
        payer = brand,
        seeds = [ CAMPAIGN_STATE_SEED, global_state.total_campaign_count.to_le_bytes().as_ref() ],
        bump,
    )]
    pub campaign_state: Box<Account<'info, CampaignState>>,

    #[account(mut)]
    pub influencer: SystemAccount<'info>,

    #[account(
        mut,
        seeds = [ INFLUENCER_INFO_SEED, influencer.key().as_ref() ],
        bump,
        constraint = influencer.key() == influencer_info.address @ ErrorCode::InvalidInfluencerAddress,
    )]
    pub influencer_info: Box<Account<'info, InfluencerInfo>>,

    #[account(
        address = COST_TOKEN_MINT_PUBKEY.parse::<Pubkey>().unwrap()
    )]
    pub cost_token_mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        associated_token::mint = cost_token_mint,
        associated_token::authority = brand,
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
        init_if_needed,
        payer = brand,
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

pub fn handle(
    ctx: Context<CreateOrder>,
    order_type: OrderType,
    release_date: u64,
    price: u64,
    data: [u8; 32],
) -> Result<()> {
    let global_state = &mut ctx.accounts.global_state;
    let campaign_state = &mut ctx.accounts.campaign_state;

    let now = Clock::get().unwrap().unix_timestamp as u64;
    require!(release_date >= now, ErrorCode::InvalidReleaseDate);
    require!(price > 0, ErrorCode::ZeroPrice);

    let fee = preview_fee(
        price,
        global_state.fee_numerator,
        global_state.fee_denumerator,
        global_state.min_fee,
    );

    // save campaign
    campaign_state.id = global_state.total_campaign_count;
    campaign_state.brand = ctx.accounts.brand.key();
    campaign_state.influencer = ctx.accounts.influencer.key();
    campaign_state.release_date = release_date;
    campaign_state.order_creation_time = now;
    campaign_state.order_completion_time = 0;
    campaign_state.order_type = order_type.clone();
    campaign_state.price = price;
    campaign_state.fee = fee;
    campaign_state.rating = 0;
    campaign_state.status = CampaignStatus::OrderCreated;
    campaign_state.data = data;

    global_state.total_campaign_count += 1;

    emit!(OrderCreated {
        campaign_id: campaign_state.id,
        brand: campaign_state.brand,
        influencer: campaign_state.influencer,
        release_date: campaign_state.release_date,
        order_creation_time: campaign_state.order_creation_time,
        order_completion_time: campaign_state.order_completion_time,
        order_type: order_type,
        price: campaign_state.price,
        fee: campaign_state.fee,
        rating: campaign_state.rating,
        status: CampaignStatus::OrderCreated,
        data: campaign_state.data,
    });

    let token_account_info = &mut &ctx.accounts.user_token_account;
    let vault_token_account_info = &mut &ctx.accounts.vault_token_account;
    let token_program = &mut &ctx.accounts.token_program;

    let cpi_accounts = Transfer {
        from: token_account_info.to_account_info().clone(),
        to: vault_token_account_info.to_account_info().clone(),
        authority: ctx.accounts.brand.to_account_info().clone(),
    };
    token::transfer(
        CpiContext::new(token_program.clone().to_account_info(), cpi_accounts),
        price + fee,
    )?;

    Ok(())
}
