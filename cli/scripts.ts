import { web3 } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

import {
  BoostType,
  CosmicIdentitySDK,
  Network,
  OrderType,
  ScaleType,
  toBN,
} from "../sdk";

let provider: anchor.AnchorProvider = null;
let cosmicIdentitySdk: CosmicIdentitySDK = null;

/** loading program & payer of the given clusters */
export const setClusterConfig = async (cluster: web3.Cluster) => {
  provider = anchor.AnchorProvider.local(web3.clusterApiUrl(cluster));
  cosmicIdentitySdk = CosmicIdentitySDK.fromAnchorProvider(
    provider,
    cluster as Network
  );
  console.log(
    "ProgramId: ",
    cosmicIdentitySdk.ctx.program.programId.toBase58()
  );

  const globalAuthority = (await cosmicIdentitySdk.accounts.globalState()).key;
  console.log("GlobalAuthority: ", globalAuthority.toBase58());
};

// Global config / Admin instructions (Gywqqwo9vj3Fu4JCBrXHWNJi2etjLhgGMXG219skzGbU)

export const initGlobal = async () => {
  console.log("Initalizing global PDA and global vault..");
  const txId1 = await cosmicIdentitySdk.methods
    .initializeGlobalState()
    .catch((e) => {
      console.error(e);
      return undefined;
    });
  console.log("txHash =", txId1);

  console.log("Initializing global Point State PDA..");
  const txId2 = await cosmicIdentitySdk.methods
    .initializeGlobalPointState()
    .catch((e) => {
      console.error(e);
      return undefined;
    });
  console.log("txHash =", txId2);
};

export const setGlobalBoostMultiplier = async (
  type: string,
  numerator: string,
  denumerator: string
) => {
  let boostType;
  switch (type) {
    case "type1":
      boostType = BoostType.Type1;
      break;
    case "type2":
      boostType = BoostType.Type1;
      break;
    case "type3":
      boostType = BoostType.Type1;
      break;
    default:
      boostType = BoostType.Type0;
  }
  const txId = await cosmicIdentitySdk.methods.setGlobalBoostMultiplier(
    boostType,
    BigInt(numerator),
    BigInt(denumerator)
  );
  console.log("txHash =", txId);
};

export const setGlobalFees = async (
  feeNumerator?: string,
  feeDenumerator?: string,
  maxMinted?: string,
  minFee?: string,
  beginMonth?: string,
  minMinted?: string,
  mintStep?: string
) => {
  const txId = await cosmicIdentitySdk.methods.setGlobalFees(
    feeNumerator ? BigInt(feeNumerator) : undefined,
    feeDenumerator ? BigInt(feeDenumerator) : undefined,
    maxMinted ? BigInt(maxMinted) : undefined,
    minFee ? BigInt(minFee) : undefined,
    beginMonth ? BigInt(beginMonth) : undefined,
    minMinted ? BigInt(minMinted) : undefined,
    mintStep ? BigInt(mintStep) : undefined
  );
  console.log("txHash =", txId);
};

export const setGlobalPeriods = async (
  releasePeriod?: string,
  acceptPeriod?: string,
  claimAfter?: string,
  approveResult?: string
) => {
  const txId = await cosmicIdentitySdk.methods.setGlobalPeriods(
    releasePeriod ? BigInt(releasePeriod) : undefined,
    acceptPeriod ? BigInt(acceptPeriod) : undefined,
    claimAfter ? BigInt(claimAfter) : undefined,
    approveResult ? BigInt(approveResult) : undefined
  );
  console.log("txHash =", txId);
};

export const transferAdminOwnership = async (address: string) => {
  const newAdmin = new PublicKey(address);
  const txId = await cosmicIdentitySdk.methods.transferGlobalAdmin(newAdmin);
  console.log("TxId =", txId);
};

export const addGlobalScale = async (
  scaleType: string,
  bound: string,
  value: string
) => {
  let type;
  switch (scaleType) {
    case "acceptOrder":
      type = ScaleType.AcceptOrder;
      break;
    case "approveResults":
      type = ScaleType.ApproveResults;
      break;
    case "completeOrder":
      type = ScaleType.CompleteOrder;
      break;
    default:
      console.error("Invalid scale type");
      return;
  }

  const txId = await cosmicIdentitySdk.methods.addGlobalScales(
    type,
    BigInt(bound),
    BigInt(value)
  );
  console.log("Tx Id =", txId);
};

export const removeGlobalScale = async (scaleType: string, index: number) => {
  let type;
  switch (scaleType) {
    case "acceptOrder":
      type = ScaleType.AcceptOrder;
      break;
    case "approveResults":
      type = ScaleType.ApproveResults;
      break;
    case "completeOrder":
      type = ScaleType.CompleteOrder;
      break;
    default:
      console.error("Invalid scale type");
      return;
  }

  const txId = await cosmicIdentitySdk.methods.removeGlobalScales(type, index);
  console.log("Tx Id =", txId);
};

// Brand / Influencer instructions (HALymjQoA8T6hJ2i65KPzp2nGd2grBscsyhYair5iMqp / C6RWeYbnMpV8SamY8MEaf2ZJ5J3ScURUPpGEQjQst28P)

export const initInfluencer = async () => {
  console.log("Initializing influencer point state of payer..");
  const txId1 = await cosmicIdentitySdk.methods
    .initializeInfluencerPointState()
    .catch((e) => {
      console.error(e);
      return undefined;
    });
  console.log("Tx Id =", txId1);

  // Await until Influencer Point State PDA become able to read
  if (txId1)
    await cosmicIdentitySdk.ctx.connection.confirmTransaction(
      txId1,
      "finalized"
    );

  console.log("Initializing influencer PDA of payer..");
  const txId2 = await cosmicIdentitySdk.methods
    .initializeInfluencer()
    .catch((e) => {
      console.error(e);
      return undefined;
    });
  console.log("Tx Id =", txId2);
};

export const setInfluencerBoost = async (type: string, expiresAt: string) => {
  let boostType;
  switch (type) {
    case "type1":
      boostType = BoostType.Type1;
      break;
    case "type2":
      boostType = BoostType.Type1;
      break;
    case "type3":
      boostType = BoostType.Type1;
      break;
    default:
      boostType = BoostType.Type0;
  }
  const txId = await cosmicIdentitySdk.methods.setInfluencerBoost(
    boostType,
    BigInt(expiresAt)
  );
  console.log("txHash =", txId);
};

export const cancelInfluencerBoost = async (
  type: string,
  expiresAt: string
) => {
  let boostType;
  switch (type) {
    case "type1":
      boostType = BoostType.Type1;
      break;
    case "type2":
      boostType = BoostType.Type1;
      break;
    case "type3":
      boostType = BoostType.Type1;
      break;
    default:
      boostType = BoostType.Type0;
  }
  const txId = await cosmicIdentitySdk.methods.cancelInfluencerBoost(
    boostType,
    BigInt(expiresAt)
  );
  console.log("txHash =", txId);
};

export const createOrder = async (
  influencer: string,
  orderType: string,
  releaseDate: string,
  price: string,
  data: Buffer
) => {
  let type;
  switch (orderType) {
    case "post":
      type = OrderType.Post;
      break;
    case "repost":
      type = OrderType.Repost;
      break;
    case "postPin":
      type = OrderType.PostPin;
      break;
  }

  const rawData = [];
  for (let i = 0; i < data.length; i++) {
    rawData.push(data.readInt8(i));
  }

  const txId = await cosmicIdentitySdk.methods.createOrder(
    new PublicKey(influencer),
    type,
    parseInt(releaseDate),
    BigInt(price),
    rawData
  );
  console.log("Tx Id =", txId);
};

export const acceptOrder = async (campaignId: string) => {
  const txId = await cosmicIdentitySdk.methods.acceptOrder(BigInt(campaignId));
  console.log("Tx Id =", txId);
};

export const rejectOrder = async (campaignId: string) => {
  const txId = await cosmicIdentitySdk.methods.rejectOrder(BigInt(campaignId));
  console.log("Tx Id =", txId);
};

export const claimOrder = async (campaignId: string) => {
  const txId = await cosmicIdentitySdk.methods.claimOrder(BigInt(campaignId));
  console.log("Tx Id =", txId);
};

export const claimDelayedOrder = async (campaignId: string) => {
  const txId = await cosmicIdentitySdk.methods.claimDelayedOrder(
    BigInt(campaignId)
  );
  console.log("Tx Id =", txId);
};

export const completeOrder = async (campaignId: string) => {
  const txId = await cosmicIdentitySdk.methods.completeOrder(
    BigInt(campaignId)
  );
  console.log("Tx Id =", txId);
};

export const approveResult = async (campaignId: string, score: bigint) => {
  const txId = await cosmicIdentitySdk.methods.approveResult(
    BigInt(campaignId),
    score
  );
  console.log("Tx Id =", txId);
};

export const rejectResult = async (campaignId: string) => {
  const txId = await cosmicIdentitySdk.methods.rejectResult(BigInt(campaignId));
  console.log("Tx Id =", txId);
};

export const claimAutoApprove = async (campaignId: string) => {
  const txId = await cosmicIdentitySdk.methods.claimAutoApprove(
    BigInt(campaignId)
  );
  console.log("Tx Id =", txId);
};

// account helpers

export const getGlobalStateInfo = async () => {
  const info = (await (await cosmicIdentitySdk.accounts.globalState()).data())
    .data;

  return {
    admin: info.admin.toBase58(),
    totalCampaignCount: toBN(info.totalCampaignCount).toNumber(),

    releasePeriod: toBN(info.releasePeriodInSeconds).toNumber(),
    acceptPeriod: toBN(info.acceptPeriodInSeconds).toNumber(),
    claimAfter: toBN(info.claimAfterInSeconds).toNumber(),
    approvePeriod: toBN(info.approvePeriodInSeconds).toNumber(),

    feeNumerator: toBN(info.feeNumerator).toNumber(),
    feeDenumerator: toBN(info.feeDenumerator).toNumber(),
    maxMinted: toBN(info.maxMintedValue).toNumber(),
    minFee: toBN(info.minFee).toNumber(),
    beginMintingMonth: toBN(info.beginMintingMonth).toNumber(),
    minMinted: toBN(info.minMintedValue).toNumber(),
    mintStep: toBN(info.mintStep).toNumber(),

    acceptOrderRewardCount: info.acceptOrderTimeRewardCount,
    acceptOrderRewards: info.acceptOrderTimeReward
      .slice(0, info.acceptOrderTimeRewardCount)
      .map((reward) => {
        return {
          bound: toBN(reward.bound).toNumber(),
          value: toBN(reward.value).toNumber(),
        };
      }),
    completeOrderRewardCount: info.completeOrderTimeRewardCount,
    completeOrderRewards: info.completeOrderTimeReward
      .slice(0, info.completeOrderTimeRewardCount)
      .map((reward) => {
        return {
          bound: toBN(reward.bound).toNumber(),
          value: toBN(reward.value).toNumber(),
        };
      }),
    approveResultsRewardCount: info.approveResultsScoreRewardCount,
    approveResultsRewards: info.approveResultsScoreReward
      .slice(0, info.approveResultsScoreRewardCount)
      .map((reward) => {
        return {
          bound: toBN(reward.bound).toNumber(),
          value: toBN(reward.value).toNumber(),
        };
      }),

    boostMultipliers: info.boostMultipliers.slice(0, 3).map((multiplier) => {
      return {
        numerator: toBN(multiplier.numerator).toNumber(),
        denumerator: toBN(multiplier.denumerator).toNumber(),
      };
    }),
  };
};

export const getInfluencerPointState = async (address?: PublicKey) => {
  let owner = address;
  if (!owner) {
    owner = (await cosmicIdentitySdk.accounts.globalState()).key;
  }
  const info = (
    await (await cosmicIdentitySdk.accounts.pointState(owner)).data()
  ).data;

  return {
    owner: info.owner.toBase58(),
    pointsByMonth: info.pointsByMonth.map((point) => {
      return {
        monthId: toBN(point.monthId).toNumber(),
        value: toBN(point.value).toNumber(),
      };
    }),
  };
};

export const getInfluencerState = async (address: PublicKey) => {
  const info = (
    await (await cosmicIdentitySdk.accounts.influencerInfo(address)).data()
  ).data;

  return {
    address: info.address.toBase58(),
    postPrice: toBN(info.postPrice).toNumber(),
    repostPrice: toBN(info.repostPrice).toNumber(),
    postPinPrice: toBN(info.postPinPrice).toNumber(),

    rating: toBN(info.rating).toNumber(),
    boost: {
      type: info.boost.boostType,
      expiresAt: toBN(info.boost.expiresAt).toNumber(),
    },
  };
};

export const getCampaignState = async (campaignId: string) => {
  const info = (
    await (await cosmicIdentitySdk.accounts.campaignState(campaignId)).data()
  ).data;

  return {
    id: toBN(info.id).toNumber(),
    brand: info.brand.toBase58(),
    influencer: info.influencer.toBase58(),
    releaseDate: toBN(info.releaseDate).toNumber(),
    orderCreationTime: toBN(info.orderCreationTime).toNumber(),
    orderCompletionTime: toBN(info.orderCompletionTime).toNumber(),
    orderType: info.orderType,

    price: toBN(info.price).toNumber(),
    fee: toBN(info.fee).toNumber(),
    rating: toBN(info.rating).toNumber(),

    status: info.status,
    data: info.data,
  };
};
