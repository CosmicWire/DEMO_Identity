import { PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { cosmicIdentityCtx } from "../sdk";
import {
  campaignState,
  globalState,
  globalVault,
  influencerInfo,
  userCostToken,
} from "../accounts";
import { COST_TOKEN_MINT_PUBKEY } from "../constants";
import { toBN } from "../utils";
import { OrderType } from "../types";

export function createOrder(ctx: cosmicIdentityCtx) {
  return async (
    influencer: PublicKey,
    orderType: OrderType,
    releaseDate: number,
    price: bigint,
    data: number[]
  ) => {
    const getGlobalState = globalState(ctx);
    const getInfluencerInfo = influencerInfo(ctx);
    const getCampaignState = campaignState(ctx);
    const globalStateKey = (await getGlobalState()).key;
    const influencerInfoKey = (await getInfluencerInfo(influencer)).key;

    const globalStateData = (await (await getGlobalState()).data()).data;
    const campaignStateKey = (
      await getCampaignState(
        toBN(globalStateData.totalCampaignCount).toString()
      )
    ).key;
    // TODO: need to check if u64 string for findProgramAddress is same address with using to_le_bytes in SC
    const globalVaultKey = (await globalVault(ctx)()).key;

    const program = ctx.program;

    const userTokenBalance = await (
      await userCostToken(ctx)(
        COST_TOKEN_MINT_PUBKEY,
        ctx.provider.wallet.publicKey
      )
    ).balance();
    if (userTokenBalance < price) throw "Insufficient user cost token balance";

    const userTokenAccount = (
      await userCostToken(ctx)(
        COST_TOKEN_MINT_PUBKEY,
        ctx.provider.wallet.publicKey
      )
    ).key;
    const vaultTokenAccount = (
      await userCostToken(ctx)(COST_TOKEN_MINT_PUBKEY, globalVaultKey)
    ).key;

    let type = {};
    switch (orderType) {
      case OrderType.Post:
        type = { post: {} };
        break;
      case OrderType.PostPin:
        type = { postPin: {} };
        break;
      case OrderType.Repost:
        type = { repost: {} };
        break;
    }
    const rawData = new Array(32 - data.length).fill(0);

    const instruction = program.methods
      .createOrder(
        type,
        toBN(BigInt(releaseDate)),
        toBN(BigInt(price)),
        data.concat(rawData)
      )
      .accounts({
        brand: ctx.provider.wallet.publicKey,
        globalState: globalStateKey,
        campaignState: campaignStateKey,
        influencer,
        influencerInfo: influencerInfoKey,
        costTokenMint: COST_TOKEN_MINT_PUBKEY,
        userTokenAccount,
        globalVault: globalVaultKey,
        vaultTokenAccount,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
