import { PublicKey } from "@solana/web3.js";

export type BoostInfo = {
  boostType: BoostType,
  expiresAt: bigint,
}

export enum BoostType {
  Type0,
  Type1,
  Type2,
  Type3,
}

export type InfluencerInfo = {
  address: PublicKey, // influencer address
  postPrice: bigint,
  repostPrice: bigint,
  postPinPrice: bigint,

  boost: BoostInfo,
  rating: bigint, //sum points which influencer is receiving
};
