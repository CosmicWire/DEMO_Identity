import { SYSVAR_RENT_PUBKEY, SystemProgram } from "@solana/web3.js";

import { cosmicIdentityCtx } from "../sdk";
import { globalState, influencerInfo, pointState } from "../accounts";

export function initializeInfluencer(ctx: cosmicIdentityCtx) {
  return async () => {
    const getGlobalState = globalState(ctx);
    const getInfluencerInfo = influencerInfo(ctx);
    const getPointState = pointState(ctx);
    const globalStateKey = (await getGlobalState()).key;
    const influencerInfoKey = (
      await getInfluencerInfo(ctx.provider.wallet.publicKey)
    ).key;
    const globalPointStateKey = (await getPointState(globalStateKey)).key;
    const influencerPointStateKey = (
      await getPointState(ctx.provider.wallet.publicKey)
    ).key;

    const program = ctx.program;

    const instruction = program.methods.initializeInfluencer().accounts({
      owner: ctx.provider.wallet.publicKey,
      globalState: globalStateKey,
      influencerInfo: influencerInfoKey,
      globalPointInfo: globalPointStateKey,
      influencerPointInfo: influencerPointStateKey,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
