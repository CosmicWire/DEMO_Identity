use crate::access_controls::global_admin::global_admin;
use crate::constants::*;
use crate::errors::ErrorCode;
use crate::state::global_state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction()]
pub struct SetGlobalFees<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        mut,
        seeds = [ GLOBAL_STATE_SEED ],
        bump,
    )]
    pub global_state: Box<Account<'info, GlobalState>>,
}

#[access_control(global_admin(&ctx.accounts.global_state, &ctx.accounts.admin))]
pub fn handle(
    ctx: Context<SetGlobalFees>,
    fee_numerator: Option<u64>,
    fee_denumerator: Option<u64>,
    max_minted_value: Option<u64>,
    min_fee: Option<u64>,
    begin_minting_month: Option<u64>,
    min_minted_value: Option<u64>,
    mint_step: Option<u64>,
) -> Result<()> {
    let global_state = &mut ctx.accounts.global_state;

    if let Some(v) = fee_numerator {
        global_state.fee_numerator = v;
    }

    if let Some(v) = fee_denumerator {
        require!(v > 0, ErrorCode::ZeroFeeDenumerator);
        global_state.fee_denumerator = v;
    }
    if let Some(v) = max_minted_value {
        global_state.max_minted_value = v;
    }
    if let Some(v) = min_fee {
        global_state.min_fee = v;
    }
    if let Some(v) = begin_minting_month {
        global_state.begin_minting_month = v;
    }
    if let Some(v) = min_minted_value {
        global_state.min_minted_value = v;
    }
    if let Some(v) = mint_step {
        global_state.mint_step = v;
    }

    Ok(())
}
