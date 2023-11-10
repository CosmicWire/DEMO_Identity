use crate::constants::*;
use crate::errors::ErrorCode;
use crate::state::global_state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializeGlobalState<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        init,
        space = GlobalState::LEN,
        payer = admin,
        seeds = [ GLOBAL_STATE_SEED ],
        bump,
    )]
    pub global_state: Box<Account<'info, GlobalState>>,

    /// CHECK: Not dangerous cause using for only cost token vault
    #[account(
        init,
        space = 0,
        payer = admin,
        seeds = [ GLOBAL_VAULT_SEED ],
        bump,
    )]
    pub global_vault: AccountInfo<'info>,

    // system accounts
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,

    #[account(
        constraint = program.programdata_address()? == Some(program_data.key()) @ ErrorCode::InvalidProgramDataAccount,
        constraint = program.key() == crate::ID,
    )]
    pub program: Program<'info, crate::program::CosmicIdentity>,
    #[account(constraint = program_data.upgrade_authority_address == Some(admin.key()) @ ErrorCode::InvalidDeployer)]
    pub program_data: Account<'info, ProgramData>,
}

pub fn handle(ctx: Context<InitializeGlobalState>) -> Result<()> {
    let global_state = &mut ctx.accounts.global_state;

    // save admin
    global_state.admin = ctx.accounts.admin.key();

    Ok(())
}
