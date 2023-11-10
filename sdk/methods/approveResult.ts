import { SYSVAR_RENT_PUBKEY, SystemProgram } from "@solana/web3.js";
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
  pointState,
  userCostToken,
} from "../accounts";
import { COST_TOKEN_MINT_PUBKEY } from "../constants";
import { toBN } from "../utils";

export function approveResult(ctx: cosmicIdentityCtx) {
  return async (campaignId: bigint, score: bigint) => {
    const getGlobalState = globalState(ctx);
    const getInfluencerInfo = influencerInfo(ctx);
    const getCampaignState = campaignState(ctx);
    const getPointState = pointState(ctx);
    const globalStateKey = (await getGlobalState()).key;
    const campaignData = (
      await (await getCampaignState(campaignId.toString())).data()
    ).data;
    const influencerInfoKey = (await getInfluencerInfo(campaignData.influencer))
      .key;
    const globalPointStateKey = (await getPointState(globalStateKey)).key;
    const influencerPointStateKey = (
      await getPointState(campaignData.influencer)
    ).key;
    const campaignStateKey = (await getCampaignState(campaignId.toString()))
      .key;
    // TODO: need to check if u64 string for findProgramAddress is same address with using to_le_bytes in SC
    const globalVaultKey = (await globalVault(ctx)()).key;

    const program = ctx.program;

    const userTokenAccount = (
      await userCostToken(ctx)(COST_TOKEN_MINT_PUBKEY, campaignData.influencer)
    ).key;
    const vaultTokenAccount = (
      await userCostToken(ctx)(COST_TOKEN_MINT_PUBKEY, globalVaultKey)
    ).key;

    const instruction = program.methods
      .approveResult(toBN(campaignId), toBN(score))
      .accounts({
        brand: ctx.provider.wallet.publicKey,
        globalState: globalStateKey,
        campaignState: campaignStateKey,
        influencer: campaignData.influencer,
        influencerInfo: influencerInfoKey,
        globalPointInfo: globalPointStateKey,
        influencerPointInfo: influencerPointStateKey,
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
