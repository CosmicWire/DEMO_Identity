use crate::access_controls::global_admin::global_admin;
use crate::constants::*;
use crate::state::global_state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction()]
pub struct RemoveGlobalScales<'info> {
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
    ctx: Context<RemoveGlobalScales>,
    scale_type: ScaleType,
    index: u8,
) -> Result<()> {
    let global_state = &mut ctx.accounts.global_state;

    global_state.remove_reward_scale(scale_type, index)?;

    Ok(())
}
