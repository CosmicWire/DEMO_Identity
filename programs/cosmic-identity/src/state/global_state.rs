use crate::errors::ErrorCode;
use crate::state::influencer_state::{BoostInfo, BoostType};

use anchor_lang::prelude::*;

#[derive(Clone, Debug, PartialEq, AnchorDeserialize, AnchorSerialize)]
pub enum ScaleType {
    AcceptOrder,
    CompleteOrder,
    ApproveResults,
}

#[derive(Clone, Copy, Default, Debug, PartialEq, AnchorDeserialize, AnchorSerialize)]
pub struct ScaleValue {
    pub bound: u64,
    pub value: u64,
}

#[derive(Clone, Copy, Debug, PartialEq, AnchorDeserialize, AnchorSerialize)]
pub struct Multiplier {
    pub numerator: u64,
    pub denumerator: u64,
}

impl Default for Multiplier {
    fn default() -> Multiplier {
        Multiplier {
            numerator: 1,
            denumerator: 1,
        }
    }
}

#[account]
#[derive(Default, Debug)]
pub struct GlobalState {
    pub admin: Pubkey, // 32
    pub total_campaign_count: u64,

    // thresholds
    pub release_period_in_seconds: u64,
    pub accept_period_in_seconds: u64,
    pub claim_after_in_seconds: u64,
    pub approve_period_in_seconds: u64,

    pub fee_numerator: u64,
    pub fee_denumerator: u64,
    pub max_minted_value: u64,
    pub min_fee: u64,
    pub begin_minting_month: u64,
    pub min_minted_value: u64,
    pub mint_step: u64,

    // scales
    pub accept_order_time_reward_count: u8,
    pub accept_order_time_reward: [ScaleValue; 10],
    pub complete_order_time_reward_count: u8,
    pub complete_order_time_reward: [ScaleValue; 10],
    pub approve_results_score_reward_count: u8,
    pub approve_results_score_reward: [ScaleValue; 10],

    // boost
    pub boost_multipliers: [Multiplier; 10],
}

impl GlobalState {
    pub const LEN: usize = 8 + 32 + 8 + 8 * 4 + 8 * 7 + 161 * 3 + 160;

    pub fn is_admin(&self, address: &Pubkey) -> bool {
        self.admin.eq(address)
    }

    pub fn get_reward_scales(&self, scale_type: ScaleType) -> (u8, [ScaleValue; 10]) {
        match scale_type {
            ScaleType::AcceptOrder => (
                self.accept_order_time_reward_count,
                self.accept_order_time_reward,
            ),
            ScaleType::CompleteOrder => (
                self.complete_order_time_reward_count,
                self.complete_order_time_reward,
            ),
            ScaleType::ApproveResults => (
                self.approve_results_score_reward_count,
                self.approve_results_score_reward,
            ),
        }
    }

    pub fn add_reward_scale(
        &mut self,
        scale_type: ScaleType,
        bound: u64,
        value: u64,
    ) -> Result<()> {
        match scale_type {
            ScaleType::AcceptOrder => {
                require!(
                    self.accept_order_time_reward_count < 10,
                    ErrorCode::TooManyScaleItems
                );

                self.accept_order_time_reward[self.accept_order_time_reward_count as usize] =
                    ScaleValue { bound, value };
                self.accept_order_time_reward_count += 1;
            }
            ScaleType::CompleteOrder => {
                require!(
                    self.complete_order_time_reward_count < 10,
                    ErrorCode::TooManyScaleItems
                );

                self.complete_order_time_reward[self.complete_order_time_reward_count as usize] =
                    ScaleValue { bound, value };
                self.complete_order_time_reward_count += 1;
            }
            ScaleType::ApproveResults => {
                require!(
                    self.approve_results_score_reward_count < 10,
                    ErrorCode::TooManyScaleItems
                );

                self.approve_results_score_reward
                    [self.approve_results_score_reward_count as usize] =
                    ScaleValue { bound, value };
                self.approve_results_score_reward_count += 1;
            }
        }

        Ok(())
    }

    pub fn remove_reward_scale(&mut self, scale_type: ScaleType, index: u8) -> Result<()> {
        match scale_type {
            ScaleType::AcceptOrder => {
                require!(
                    self.accept_order_time_reward_count > index,
                    ErrorCode::InvalidScaleIndex
                );

                self.accept_order_time_reward[index as usize] = self.accept_order_time_reward
                    [(self.accept_order_time_reward_count - 1) as usize];
                self.accept_order_time_reward_count -= 1;
            }
            ScaleType::CompleteOrder => {
                require!(
                    self.complete_order_time_reward_count > index,
                    ErrorCode::InvalidScaleIndex
                );

                self.complete_order_time_reward[index as usize] = self.complete_order_time_reward
                    [(self.complete_order_time_reward_count - 1) as usize];
                self.complete_order_time_reward_count -= 1;
            }
            ScaleType::ApproveResults => {
                require!(
                    self.approve_results_score_reward_count > index,
                    ErrorCode::InvalidScaleIndex
                );

                self.approve_results_score_reward[index as usize] = self
                    .approve_results_score_reward
                    [self.approve_results_score_reward_count as usize];
                self.approve_results_score_reward_count -= 1;
            }
        }

        Ok(())
    }

    pub fn get_boosted_value(&self, value: u64, boost_info: BoostInfo, now: u64) -> u64 {
        if boost_info.expires_at < now {
            return value;
        }

        let mut mutiplier: (u64, u64) = (1, 1);
        match boost_info.boost_type {
            BoostType::Type0 => return value,
            BoostType::Type1 => {
                mutiplier = (
                    self.boost_multipliers[0].numerator,
                    self.boost_multipliers[0].denumerator,
                )
            }
            BoostType::Type2 => {
                mutiplier = (
                    self.boost_multipliers[1].numerator,
                    self.boost_multipliers[1].denumerator,
                )
            }
            BoostType::Type3 => {
                mutiplier = (
                    self.boost_multipliers[2].numerator,
                    self.boost_multipliers[2].denumerator,
                )
            }
        };

        return (value as u128 * mutiplier.0 as u128 / mutiplier.1 as u128) as u64;
    }

    pub fn set_multiplier(
        &mut self,
        boost_type: BoostType,
        numerator: u64,
        denumerator: u64,
    ) -> Result<()> {
        require!(denumerator > 0, ErrorCode::ZeroFeeDenumerator);
        match boost_type {
            BoostType::Type1 => {
                self.boost_multipliers[0].numerator = numerator;
                self.boost_multipliers[0].denumerator = denumerator;
            }
            BoostType::Type2 => {
                self.boost_multipliers[1].numerator = numerator;
                self.boost_multipliers[1].denumerator = denumerator;
            }
            BoostType::Type3 => {
                self.boost_multipliers[2].numerator = numerator;
                self.boost_multipliers[2].denumerator = denumerator;
            }
            _ => {}
        }
        Ok(())
    }
}
