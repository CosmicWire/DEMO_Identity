use crate::access_controls::global_admin::global_admin;
use crate::constants::*;
use crate::state::global_state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction()]
pub struct SetGlobalPeriods<'info> {
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
    ctx: Context<SetGlobalPeriods>,
    release_period: Option<u64>,
    accept_period: Option<u64>,
    claim_after: Option<u64>,
    approve_period: Option<u64>,
) -> Result<()> {
    let global_state = &mut ctx.accounts.global_state;

    if let Some(rp) = release_period {
        global_state.release_period_in_seconds = rp;
    }
    if let Some(ap) = accept_period {
        global_state.accept_period_in_seconds = ap;
    }
    if let Some(ca) = claim_after {
        global_state.claim_after_in_seconds = ca;
    }
    if let Some(ap) = approve_period {
        global_state.approve_period_in_seconds = ap;
    }

    Ok(())
}
