use crate::errors::ErrorCode;
use crate::state::campaign_state::CampaignState;
use anchor_lang::prelude::*;

pub fn only_influencer(
    campaign_state: &CampaignState,
    influencer: &Signer,
    campaign_id: u64,
) -> Result<()> {
    require!(
        campaign_state.id == campaign_id,
        ErrorCode::InvalidCampaignId
    );

    require!(
        campaign_state.is_influencer(&influencer.key()),
        ErrorCode::CampaignInfluencerMismatch
    );

    Ok(())
}
