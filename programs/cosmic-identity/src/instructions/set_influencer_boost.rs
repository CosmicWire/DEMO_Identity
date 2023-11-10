use crate::constants::*;
use crate::errors::ErrorCode;
use crate::state::influencer_state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct SetInfluencerBoost<'info> {
    #[account(mut)]
    pub influencer: Signer<'info>,

    #[account(
        mut,
        seeds = [ INFLUENCER_INFO_SEED, influencer.key().as_ref() ],
        bump,
    )]
    pub influencer_info: Box<Account<'info, InfluencerInfo>>,
}

pub fn handle(
    ctx: Context<SetInfluencerBoost>,
    boost_type: BoostType,
    expires_at: u64,
) -> Result<()> {
    let influencer_info = &mut ctx.accounts.influencer_info;

    require!(
        ctx.accounts.influencer.key().eq(&influencer_info.address),
        ErrorCode::InvalidInfluencerAddress,
    );

    let now = Clock::get().unwrap().unix_timestamp as u64;
    influencer_info.set_boost(boost_type, expires_at, now)?;

    Ok(())
}
