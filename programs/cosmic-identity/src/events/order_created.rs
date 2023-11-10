use crate::state::campaign_state::*;
use anchor_lang::prelude::*;

#[event]
pub struct OrderCreated {
    pub campaign_id: u64,
    pub brand: Pubkey,
    pub influencer: Pubkey,
    pub release_date: u64,
    pub order_creation_time: u64,
    pub order_completion_time: u64,
    pub order_type: OrderType,
    pub price: u64,
    pub fee: u64,
    pub rating: u64,
    pub status: CampaignStatus,
    pub data: [u8; 32],
}
