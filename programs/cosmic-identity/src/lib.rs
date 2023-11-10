mod access_controls;
mod constants;
mod errors;
mod events;
mod instructions;
mod state;
mod utils;

use instructions::accept_order::*;
use instructions::add_global_scales::*;
use instructions::approve_result::*;
use instructions::cancel_influencer_boost::*;
use instructions::claim_auto_approved::*;
use instructions::claim_delayed_order::*;
use instructions::claim_order::*;
use instructions::complete_order::*;
use instructions::create_order::*;
use instructions::initialize_global_state::*;
use instructions::initialize_influencer::*;
use instructions::initialize_point_state::*;
use instructions::reject_order::*;
use instructions::reject_result::*;
use instructions::remove_global_scales::*;
use instructions::set_global_boost_multiplier::*;
use instructions::set_global_fees::*;
use instructions::set_global_periods::*;
use instructions::set_influencer_boost::*;
use instructions::transfer_global_admin::*;

use crate::state::campaign_state::OrderType;
use crate::state::global_state::ScaleType;
use crate::state::influencer_state::BoostType;
use anchor_lang::prelude::*;

declare_id!("8AWRJGctBW7QJD18oowxiNcWy3K2HGEQPDSAu4WcLMdF");

#[program]
pub mod cosmic_identity {

    use super::*;

    /**
     * Initializes a global state account.
     * Deployer becomes the initial admin of global state.
     */
    pub fn initialize_global_state(ctx: Context<InitializeGlobalState>) -> Result<()> {
        instructions::initialize_global_state::handle(ctx)
    }

    /**
     * Transfer admin of global state to another address.
     * Restricted to global admin.
     *
     * - `new_admin` - The new address for global admin.
     */
    pub fn transfer_global_admin(
        ctx: Context<TransferGlobalAdmin>,
        new_admin: Pubkey,
    ) -> Result<()> {
        instructions::transfer_global_admin::handle(ctx, new_admin)
    }

    /**
     * Set fee related thresholds for global config
     * Restricted to global admin.
     */
    pub fn set_global_fees(
        ctx: Context<SetGlobalFees>,
        fee_numerator: Option<u64>,
        fee_denumerator: Option<u64>,
        max_minted_value: Option<u64>,
        min_fee: Option<u64>,
        begin_minting_month: Option<u64>,
        min_minted_value: Option<u64>,
        mint_step: Option<u64>,
    ) -> Result<()> {
        instructions::set_global_fees::handle(
            ctx,
            fee_numerator,
            fee_denumerator,
            max_minted_value,
            min_fee,
            begin_minting_month,
            min_minted_value,
            mint_step,
        )
    }

    /**
     * Set period thresholds for global config
     * Restricted to global admin.
     */
    pub fn set_global_periods(
        ctx: Context<SetGlobalPeriods>,
        release_period: Option<u64>,
        accept_period: Option<u64>,
        claim_after: Option<u64>,
        approve_period: Option<u64>,
    ) -> Result<()> {
        instructions::set_global_periods::handle(
            ctx,
            release_period,
            accept_period,
            claim_after,
            approve_period,
        )
    }

    /**
     * Add scales threshold for global config
     * Restricted to global admin.
     */
    pub fn add_global_scales(
        ctx: Context<AddGlobalScales>,
        scale_type: ScaleType,
        bound: u64,
        value: u64,
    ) -> Result<()> {
        instructions::add_global_scales::handle(ctx, scale_type, bound, value)
    }

    /**
     * Remove scales threshold for global config
     * Restricted to global admin.
     */
    pub fn remove_global_scales(
        ctx: Context<RemoveGlobalScales>,
        scale_type: ScaleType,
        index: u8,
    ) -> Result<()> {
        instructions::remove_global_scales::handle(ctx, scale_type, index)
    }

    /**
     * Set boost multipliers for global config
     * Restricted to global admin.
     */
    pub fn set_global_boost_multiplier(
        ctx: Context<SetGlobalBoostMultiplier>,
        boost_type: BoostType,
        numerator: u64,
        denumerator: u64,
    ) -> Result<()> {
        instructions::set_global_boost_multiplier::handle(ctx, boost_type, numerator, denumerator)
    }

    /**
     * Initializes a influencer info PDA.
     * Influencer has mint right.
     */

    pub fn initialize_influencer(ctx: Context<InitializeInfluencer>) -> Result<()> {
        instructions::initialize_influencer::handle(ctx)
    }

    /**
     * Set influencer boost config.
     */

    pub fn set_influencer_boost(
        ctx: Context<SetInfluencerBoost>,
        boost_type: BoostType,
        expires_at: u64,
    ) -> Result<()> {
        instructions::set_influencer_boost::handle(ctx, boost_type, expires_at)
    }

    /**
     * Cancel influencer boost config.
     */

    pub fn cancel_influencer_boost(
        ctx: Context<CancelInfluencerBoost>,
        boost_type: BoostType,
        expires_at: u64,
    ) -> Result<()> {
        instructions::cancel_influencer_boost::handle(ctx, boost_type, expires_at)
    }

    /**
     * Initializes a point state info PDA.
     */

    pub fn initialize_point_state(ctx: Context<InitializePointState>) -> Result<()> {
        instructions::initialize_point_state::handle(ctx)
    }

    /**
    * Creates order for ad campaign
    * - caller: brand
    * influencerID verified influencer's address
    * orderType type of order (post, repost, post+pin)
    * releaseDate plan date of ad integration (unix timestamp / 1000)
    * data hash of off-chain order's data

    * #### Special Errors
    * `InvalidInfluencerAddress` - Influencer account not exist or does not match the address of account provided
    * `InvalidReleaseDate` - Order release date should be future time
    * `ZeroPrice` - Order price should not be zero
    */
    pub fn create_order(
        ctx: Context<CreateOrder>,
        order_type: OrderType,
        release_date: u64,
        price: u64,
        data: [u8; 32],
    ) -> Result<()> {
        instructions::create_order::handle(ctx, order_type, release_date, price, data)
    }

    /**
     * Accepts order
     *  - caller: influencer
     * campaignID id of the campaign
     */
    pub fn accept_order(ctx: Context<AcceptOrder>, campaign_id: u64) -> Result<()> {
        instructions::accept_order::handle(ctx, campaign_id)
    }

    /**
     * Rejects order if it's not refunded
     *  - caller: influencer
     * campaignID id of the campaign
     */
    pub fn reject_order(ctx: Context<RejectOrder>, campaign_id: u64) -> Result<()> {
        instructions::reject_order::handle(ctx, campaign_id)
    }

    /**
     * Returns money to the brand if order is rejected or time is up
     *  - caller: brand
     * campaignID id of the campaign
     */
    pub fn claim_order(ctx: Context<ClaimOrder>, campaign_id: u64) -> Result<()> {
        instructions::claim_order::handle(ctx, campaign_id)
    }

    /**
     * Marks order as completed and accrues rating points
     *  - caller: influencer
     * campaignID id of the campaign
     */
    pub fn complete_order(ctx: Context<CompleteOrder>, campaign_id: u64) -> Result<()> {
        instructions::complete_order::handle(ctx, campaign_id)
    }

    /**
     * Returns money to the brand if order is not completed in time
     *  - caller: brand
     * campaignID id of the campaign
     */
    pub fn claim_delayed_order(ctx: Context<ClaimDelayedOrder>, campaign_id: u64) -> Result<()> {
        instructions::claim_delayed_order::handle(ctx, campaign_id)
    }

    /**
     * Aproves result of ad campaign
     *  - caller: brand
     * campaignID id of the campaign
     */
    pub fn approve_result(ctx: Context<ApproveResult>, campaign_id: u64, score: u64) -> Result<()> {
        instructions::approve_result::handle(ctx, campaign_id, score)
    }

    /**
     * Claims rewards for ad campaign
     *  - caller: influencer
     * campaignID id of the campaign
     */
    pub fn claim_auto_approve(ctx: Context<ClaimAutoApproved>, campaign_id: u64) -> Result<()> {
        instructions::claim_auto_approved::handle(ctx, campaign_id)
    }

    /**
     * Reject Ad campaign
     *  - caller: brand
     * Admin can manage contract and send funds to influencer/business
     *
     * campaignID id of the campaign
     */
    pub fn reject_result(ctx: Context<RejectResult>, campaign_id: u64) -> Result<()> {
        instructions::reject_result::handle(ctx, campaign_id)
    }
}
