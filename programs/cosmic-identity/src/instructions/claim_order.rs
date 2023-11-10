use crate::access_controls::only_brand::*;
use crate::constants::*;
use crate::errors::ErrorCode;
use crate::events::order_updated::OrderUpdated;
use crate::state::campaign_state::*;
use crate::state::global_state::GlobalState;

use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

#[derive(Accounts)]
#[instruction(campaign_id: u64)]
pub struct ClaimOrder<'info> {
    #[account(mut)]
    pub brand: Signer<'info>,

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
        mut,
        associated_token::mint = cost_token_mint,
        associated_token::authority = global_vault,
    )]
    pub vault_token_account: Box<Account<'info, TokenAccount>>,

    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Program<'info, Token>,
}

#[access_control(only_brand(&ctx.accounts.campaign_state, &ctx.accounts.brand, campaign_id))]
pub fn handle(ctx: Context<ClaimOrder>, campaign_id: u64) -> Result<()> {
    let global_state = &mut ctx.accounts.global_state;
    let campaign_state = &mut ctx.accounts.campaign_state;

    let now = Clock::get().unwrap().unix_timestamp as u64;
    if campaign_state.status == CampaignStatus::OrderCreated {
        require!(
            now >= campaign_state.order_creation_time + global_state.accept_period_in_seconds,
            ErrorCode::InvalidClaimTime
        );
    } else if campaign_state.status != CampaignStatus::OrderRejected {
        return Err(ErrorCode::InvalidCampaignStatus.into());
    }

    campaign_state.status = CampaignStatus::OrderRefunded;

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
        campaign_state.price + campaign_state.fee,
    )?;

    Ok(())
}
