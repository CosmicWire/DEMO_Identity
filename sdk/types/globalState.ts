import { PublicKey } from "@solana/web3.js";

export enum ScaleType {
  AcceptOrder,
  CompleteOrder,
  ApproveResults,
}

export type ScaleValue = {
  bound: bigint;
  value: bigint;
};

export type Multiplier = {
  numerator: bigint;
  denumerator: bigint;
};

export type GlobalState = {
  admin: PublicKey;
  totalCampaignCount: bigint;

  // thresholds
  releasePeriodInSeconds: bigint;
  acceptPeriodInSeconds: bigint;
  claimAfterInSeconds: bigint;
  approvePeriodInSeconds: bigint;

  feeNumerator: bigint;
  feeDenumerator: bigint;
  maxMintedValue: bigint;
  minFee: bigint;
  beginMintingMonth: bigint;
  minMintedValue: bigint;
  mintStep: bigint;

  // scales
  acceptOrderTimeRewardCount: number;
  acceptOrderTimeReward: ScaleValue[];
  completeOrderTimeRewardCount: number;
  completeOrderTimeReward: ScaleValue[];
  approveResultsScoreRewardCount: number;
  approveResultsScoreReward: ScaleValue[];

  // boost
  boostMultipliers: Multiplier[];
};
