use crate::errors::ErrorCode;
use crate::state::campaign_state::OrderType;

use anchor_lang::prelude::*;

#[derive(Clone, Copy, Default, Debug, PartialEq, AnchorDeserialize, AnchorSerialize)]
pub enum BoostType {
    #[default]
    Type0,
    Type1,
    Type2,
    Type3,
}

#[derive(Clone, Copy, Default, Debug, PartialEq, AnchorDeserialize, AnchorSerialize)]
pub struct BoostInfo {
    pub boost_type: BoostType,
    pub expires_at: u64,
}

#[account]
#[derive(Default, Debug)]
pub struct InfluencerInfo {
    pub address: Pubkey,     // 32
    pub post_price: u64,     // 8
    pub repost_price: u64,   // 8
    pub post_pin_price: u64, // 8

    pub rating: u64,
    pub boost: BoostInfo,
}

impl InfluencerInfo {
    pub const LEN: usize = 8 + 32 + 8 * 3 + 8 + 9;

    pub fn is_owner(&self, address: &Pubkey) -> bool {
        self.address.eq(address)
    }

    // Get influencer price info by order_type
    pub fn get_price(&self, order_type: OrderType) -> u64 {
        match order_type {
            OrderType::Post => self.post_price,
            OrderType::Repost => self.repost_price,
            OrderType::PostPin => self.post_pin_price,
        }
    }

    // Set influencer price info by order_type
    pub fn set_price(&mut self, order_type: OrderType, price: u64) {
        match order_type {
            OrderType::Post => self.post_price = price,
            OrderType::Repost => self.repost_price = price,
            OrderType::PostPin => self.post_pin_price = price,
        };
    }

    // config boost setting with expiration time
    // TODO: should add config boost Ix
    pub fn set_boost(&mut self, boost_type: BoostType, expires_at: u64, now: u64) -> Result<()> {
        require!(
            self.boost.boost_type == BoostType::Type0 || self.boost.expires_at <= now,
            ErrorCode::AlreadyBoosted
        );

        self.boost.boost_type = boost_type;
        self.boost.expires_at = expires_at;
        Ok(())
    }

    // cancel boost config setting
    // TODO: should add cancel boost config Ix
    pub fn cancel_boost(&mut self, boost_type: BoostType, expires_at: u64, now: u64) -> Result<()> {
        require!(
            self.boost.boost_type != BoostType::Type0 && self.boost.expires_at > now,
            ErrorCode::AlreadyInvalidBoost
        );

        self.boost.boost_type = boost_type;
        self.boost.expires_at = expires_at;
        Ok(())
    }
}
