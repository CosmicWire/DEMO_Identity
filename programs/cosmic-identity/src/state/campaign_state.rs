use anchor_lang::prelude::*;

#[derive(Clone, Copy, Default, Debug, PartialEq, AnchorDeserialize, AnchorSerialize)]
pub enum CampaignStatus {
    #[default]
    NotExist,
    OrderCreated,
    OrderAccepted,
    OrderRejected,
    OrderRefunded,
    OrderFilled,
    OrderDelayedRefunded,
    ResultAproved,
    ResultRejected,
    ResultAutoAproved,
    ResultRejectedAdmin,
    ResultAprovedAdmin,
}

#[derive(Clone, Copy, Default, Debug, PartialEq, AnchorDeserialize, AnchorSerialize)]
pub enum OrderType {
    #[default]
    Post,
    Repost,
    PostPin,
}

#[account]
#[derive(Default, Debug)]
pub struct CampaignState {
    pub id: u64,
    pub brand: Pubkey,              // brand address to book campaign
    pub influencer: Pubkey,         // influencer address to book campaign
    pub release_date: u64, //dateAds for booking ads campaign (the 1st second of the dateAds)
    pub order_creation_time: u64, //time when the order is created
    pub order_completion_time: u64, //time when the ads was completed by influencer
    pub order_type: OrderType, // 1 - post, 2 - repost, 3 - post+pin24
    pub price: u64,        //how much paid in total by brand in USDC
    pub fee: u64,
    pub rating: u64, //sum points which influencer is receiving during the campaign
    pub status: CampaignStatus,
    pub data: [u8; 32], // 32 bytes raw data
}

impl CampaignState {
    pub const LEN: usize = 8 + 8 + 32 + 32 + 8 + 8 + 8 + 1 + 8 + 8 + 8 + 1 + 32;

    pub fn is_brand(&self, address: &Pubkey) -> bool {
        self.brand.eq(address)
    }

    pub fn is_influencer(&self, address: &Pubkey) -> bool {
        self.influencer.eq(address)
    }
}
