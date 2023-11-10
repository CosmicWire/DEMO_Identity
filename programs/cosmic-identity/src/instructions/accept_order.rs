use crate::access_controls::only_influencer::*;
use crate::constants::*;
use crate::errors::ErrorCode;
use crate::events::order_updated::OrderUpdated;
use crate::state::campaign_state::*;
use crate::state::global_state::*;

use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(campaign_id: u64)]
pub struct AcceptOrder<'info> {
    #[account(mut)]
    pub influencer: Signer<'info>,

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
}

#[access_control(only_influencer(&ctx.accounts.campaign_state, &ctx.accounts.influencer, campaign_id))]
pub fn handle(ctx: Context<AcceptOrder>, campaign_id: u64) -> Result<()> {
    let global_state = &mut ctx.accounts.global_state;
    let campaign_state = &mut ctx.accounts.campaign_state;

    require!(
        campaign_state.status == CampaignStatus::OrderCreated,
        ErrorCode::NotOrderCreatedStatus
    );

    let now = Clock::get().unwrap().unix_timestamp as u64;

    let (reward_scale_count, reward_scales) =
        global_state.get_reward_scales(ScaleType::AcceptOrder);

    for i in 0..reward_scale_count {
        let idx = i as usize;
        if now <= campaign_state.order_creation_time + reward_scales[idx].bound {
            campaign_state.rating += reward_scales[idx].value;
            break;
        }
    }

    campaign_state.status = CampaignStatus::OrderAccepted;

    emit!(OrderUpdated {
        campaign_id: campaign_state.id,
        rating: campaign_state.rating,
        status: campaign_state.status,
        order_completion_time: 0,
    });

    Ok(())
}
