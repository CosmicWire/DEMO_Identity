use crate::access_controls::global_admin::global_admin;
use crate::constants::*;
use crate::state::global_state::*;
use crate::state::influencer_state::BoostType;
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction()]
pub struct SetGlobalBoostMultiplier<'info> {
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
    ctx: Context<SetGlobalBoostMultiplier>,
    boost_type: BoostType,
    numerator: u64,
    denumerator: u64,
) -> Result<()> {
    let global_state = &mut ctx.accounts.global_state;

    global_state.set_multiplier(boost_type, numerator, denumerator)?;

    Ok(())
}
