use crate::state::campaign_state::*;
use anchor_lang::prelude::*;

#[event]
pub struct OrderUpdated {
    pub campaign_id: u64,
    pub rating: u64,
    pub status: CampaignStatus,
    pub order_completion_time: u64,
}
