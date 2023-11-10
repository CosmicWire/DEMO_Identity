use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Global state admin does not match the address of account provided")]
    InvalidGlobalAdmin,

    #[msg("Global state initializer does not match the deployer of program")]
    InvalidDeployer,

    #[msg("Invalid ProgramData account")]
    InvalidProgramDataAccount,

    #[msg("Global fee denumerator should not zero")]
    ZeroFeeDenumerator,

    #[msg("Influencer info owner does not match the address of account provided")]
    InvalidInfluencerAddress,

    #[msg("Campaign release date should future time")]
    InvalidReleaseDate,

    #[msg("Campaign Price should not zero")]
    ZeroPrice,

    #[msg("Not able to add more than 10 scale items")]
    TooManyScaleItems,

    #[msg("Over range of scale items index")]
    InvalidScaleIndex,

    #[msg("Campaign id does not match with provided id")]
    InvalidCampaignId,

    #[msg("Campaign influencer does not match with provided influencer address")]
    CampaignInfluencerMismatch,

    #[msg("Campaign status is not order created status")]
    NotOrderCreatedStatus,

    #[msg("Campaign brand does not match with provided brand address")]
    CampaignBrandMismatch,

    #[msg("Campaign claim not able yet")]
    InvalidClaimTime,

    #[msg("Campaign status value is invalid for this case")]
    InvalidCampaignStatus,

    #[msg("Campaign status is not order accepted status")]
    NotOrderAcceptedStatus,

    #[msg("Campaign complete not able yet")]
    InvalidCompleteTime,

    #[msg("Campaign approve score value is invalid")]
    InvalidScoreValue,

    #[msg("Influencer already have valid boosting config")]
    AlreadyBoosted,

    #[msg("Influencer boosting not configured or already expired config")]
    AlreadyInvalidBoost,

    #[msg("Owner address of point state not match with provided account address")]
    InvalidPointStateOwner,

    #[msg("Campaign claim auto approve not able yet")]
    InvalidAutoApproveTime,
}
