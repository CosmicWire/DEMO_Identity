use crate::constants::*;
use crate::errors::ErrorCode;
use crate::state::global_state::GlobalState;
use crate::state::influencer_state::*;
use crate::state::point_state::PointState;
use crate::utils::{calculate_month_id, increase_account_size};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializeInfluencer<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        mut,
        seeds = [ GLOBAL_STATE_SEED ],
        bump,
    )]
    pub global_state: Box<Account<'info, GlobalState>>,

    #[account(
        init,
        space = InfluencerInfo::LEN,
        payer = owner,
        seeds = [ INFLUENCER_INFO_SEED, owner.key().as_ref() ],
        bump,
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
        seeds = [ POINT_STATE_SEED, owner.key().as_ref() ],
        bump,
        constraint = owner.key() == influencer_point_info.owner @ ErrorCode::InvalidPointStateOwner,
    )]
    pub influencer_point_info: Box<Account<'info, PointState>>,

    // system accounts
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<InitializeInfluencer>) -> Result<()> {
    let influencer_info = &mut ctx.accounts.influencer_info;
    let global_point_info = &mut ctx.accounts.global_point_info.clone();
    let influencer_point_info = &mut ctx.accounts.influencer_point_info.clone();

    // save owner
    influencer_info.address = ctx.accounts.owner.key();
    influencer_info.rating = 100;

    let now = Clock::get().unwrap().unix_timestamp as u64;
    let month_id = calculate_month_id(now);

    if !global_point_info.try_update(month_id, 100) {
        increase_account_size(
            &mut ctx.accounts.global_point_info.to_account_info(),
            &mut ctx.accounts.owner.to_account_info(),
            &ctx.accounts.system_program.to_account_info(),
            16, // new point item size
        )?;
        global_point_info.append(month_id, 100);
    }

    if !influencer_point_info.try_update(month_id, 100) {
        increase_account_size(
            &mut ctx.accounts.influencer_point_info.to_account_info(),
            &mut ctx.accounts.owner.to_account_info(),
            &ctx.accounts.system_program.to_account_info(),
            16, // new point item size
        )?;
        influencer_point_info.append(month_id, 100);
    }

    Ok(())
}
