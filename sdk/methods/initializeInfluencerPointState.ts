import { SYSVAR_RENT_PUBKEY, SystemProgram } from "@solana/web3.js";

import { cosmicIdentityCtx } from "../sdk";
import { pointState } from "../accounts";

export function initializeInfluencerPointState(ctx: cosmicIdentityCtx) {
  return async () => {
    const getPointState = pointState(ctx);
    const influencerPointStateKey = (
      await getPointState(ctx.provider.wallet.publicKey)
    ).key;

    const program = ctx.program;

    const instruction = program.methods.initializePointState().accounts({
      payer: ctx.provider.wallet.publicKey,
      owner: ctx.provider.wallet.publicKey,
      pointInfo: influencerPointStateKey,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
