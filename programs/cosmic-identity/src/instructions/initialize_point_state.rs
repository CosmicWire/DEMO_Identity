use crate::constants::*;
use crate::state::point_state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializePointState<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    /// CHECK: this account is not dangerous cause will use for only ownership of point_info
    pub owner: AccountInfo<'info>,

    #[account(
        init,
        payer = payer,
        seeds = [ POINT_STATE_SEED, owner.key().as_ref() ],
        bump,
        space = PointState::INIT_LEN
    )]
    pub point_info: Box<Account<'info, PointState>>,

    // system accounts
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<InitializePointState>) -> Result<()> {
    let point_info = &mut ctx.accounts.point_info;

    // save owner
    point_info.owner = ctx.accounts.owner.key();

    Ok(())
}
