import { PublicKey } from "@solana/web3.js";

export enum CampaignStatus {
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

export enum OrderType {
  Post,
  Repost,
  PostPin,
}

export type CampaignState = {
  id: bigint,
  brand: PublicKey,              // brand address to book campaign
  influencer: PublicKey,         // influencer address to book campaign
  releaseDate: bigint, //dateAds for booking ads campaign (the 1st second of the dateAds)
  orderCreationTime: bigint, //time when the order is created
  orderCompletionTime: bigint, //time when the ads was completed by influencer
  orderType: OrderType, // 1 - post, 2 - repost, 3 - post+pin24
  price: bigint,        //how much paid in total by brand in USDC
  fee: bigint,
  rating: bigint, //sum points which influencer is receiving during the campaign
  status: CampaignStatus,
  data: number[], // 32 bytes raw data
};
