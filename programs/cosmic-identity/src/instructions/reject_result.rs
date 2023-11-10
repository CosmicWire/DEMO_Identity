use crate::access_controls::only_brand::*;
use crate::constants::*;
use crate::errors::ErrorCode;
use crate::events::order_updated::OrderUpdated;
use crate::state::campaign_state::*;

use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(campaign_id: u64)]
pub struct RejectResult<'info> {
    #[account(mut)]
    pub brand: Signer<'info>,

    #[account(
        mut,
        seeds = [ CAMPAIGN_STATE_SEED, campaign_id.to_le_bytes().as_ref() ],
        bump,
    )]
    pub campaign_state: Box<Account<'info, CampaignState>>,
}

#[access_control(only_brand(&ctx.accounts.campaign_state, &ctx.accounts.brand, campaign_id))]
pub fn handle(ctx: Context<RejectResult>, campaign_id: u64) -> Result<()> {
    let campaign_state = &mut ctx.accounts.campaign_state;

    require!(
        campaign_state.status == CampaignStatus::OrderFilled,
        ErrorCode::NotOrderCreatedStatus
    );

    campaign_state.status = CampaignStatus::ResultRejected;

    emit!(OrderUpdated {
        campaign_id: campaign_state.id,
        rating: campaign_state.rating,
        status: campaign_state.status,
        order_completion_time: 0,
    });

    Ok(())
}
