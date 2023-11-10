import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { cosmicIdentityCtx } from "../sdk";
import { campaignState, globalVault, userCostToken } from "../accounts";
import { COST_TOKEN_MINT_PUBKEY } from "../constants";
import { toBN } from "../utils";

export function rejectOrder(ctx: cosmicIdentityCtx) {
  return async (campaignId: bigint) => {
    const getCampaignState = campaignState(ctx);

    const campaignStateKey = (await getCampaignState(campaignId.toString()))
      .key;
    const campaignData = (
      await (await getCampaignState(campaignId.toString())).data()
    ).data;
    // TODO: need to check if u64 string for findProgramAddress is same address with using to_le_bytes in SC
    const globalVaultKey = (await globalVault(ctx)()).key;

    const program = ctx.program;

    const userTokenAccount = (
      await userCostToken(ctx)(COST_TOKEN_MINT_PUBKEY, campaignData.brand)
    ).key;
    const vaultTokenAccount = (
      await userCostToken(ctx)(COST_TOKEN_MINT_PUBKEY, globalVaultKey)
    ).key;

    const instruction = program.methods.rejectOrder(toBN(campaignId)).accounts({
      influencer: ctx.provider.wallet.publicKey,
      campaignState: campaignStateKey,
      costTokenMint: COST_TOKEN_MINT_PUBKEY,
      brand: campaignData.brand,
      userTokenAccount,
      globalVault: globalVaultKey,
      vaultTokenAccount,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
    });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
