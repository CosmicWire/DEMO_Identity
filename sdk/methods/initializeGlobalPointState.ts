import { SYSVAR_RENT_PUBKEY, SystemProgram } from "@solana/web3.js";

import { cosmicIdentityCtx } from "../sdk";
import { globalState, pointState } from "../accounts";

export function initializeGlobalPointState(ctx: cosmicIdentityCtx) {
  return async () => {
    const getGlobalState = globalState(ctx);
    const getPointState = pointState(ctx);
    const globalStateKey = (await getGlobalState()).key;
    const globalPointStateKey = (await getPointState(globalStateKey)).key;

    const program = ctx.program;

    const instruction = program.methods.initializePointState().accounts({
      payer: ctx.provider.wallet.publicKey,
      owner: globalStateKey,
      pointInfo: globalPointStateKey,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
