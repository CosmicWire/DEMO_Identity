import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { cosmicIdentityCtx } from "../sdk";
import {
  campaignState,
  globalState,
  globalVault,
  userCostToken,
} from "../accounts";
import { COST_TOKEN_MINT_PUBKEY } from "../constants";
import { toBN } from "../utils";

export function claimOrder(ctx: cosmicIdentityCtx) {
  return async (campaignId: bigint) => {
    const getGlobalState = globalState(ctx);
    const getCampaignState = campaignState(ctx);
    const globalStateKey = (await getGlobalState()).key;
    const campaignStateKey = (await getCampaignState(campaignId.toString()))
      .key;
    // TODO: need to check if u64 string for findProgramAddress is same address with using to_le_bytes in SC
    const globalVaultKey = (await globalVault(ctx)()).key;

    const program = ctx.program;

    const userTokenAccount = (
      await userCostToken(ctx)(
        COST_TOKEN_MINT_PUBKEY,
        ctx.provider.wallet.publicKey
      )
    ).key;
    const vaultTokenAccount = (
      await userCostToken(ctx)(COST_TOKEN_MINT_PUBKEY, globalVaultKey)
    ).key;

    const instruction = program.methods.claimOrder(toBN(campaignId)).accounts({
      brand: ctx.provider.wallet.publicKey,
      globalState: globalStateKey,
      campaignState: campaignStateKey,
      costTokenMint: COST_TOKEN_MINT_PUBKEY,
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
