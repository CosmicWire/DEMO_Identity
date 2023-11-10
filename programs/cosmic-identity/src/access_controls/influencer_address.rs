use crate::errors::ErrorCode;
use crate::state::influencer_state::InfluencerInfo;
use anchor_lang::prelude::*;

pub fn influencer_address(influencer_info: &InfluencerInfo, owner: &Signer) -> Result<()> {
    require!(
        influencer_info.is_owner(&owner.key()),
        ErrorCode::InvalidInfluencerAddress
    );

    Ok(())
}
