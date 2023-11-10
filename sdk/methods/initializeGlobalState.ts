import { PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram } from "@solana/web3.js";

import { cosmicIdentityCtx } from "../sdk";
import { globalState, globalVault } from "../accounts";

export function initializeGlobalState(ctx: cosmicIdentityCtx) {
  return async () => {
    const getGlobalState = globalState(ctx);
    const globalStateKey = (await getGlobalState()).key;
    const globalVaultKey = (await globalVault(ctx)()).key;

    const program = ctx.program;

    const [programData] = await ctx.utils.getPDA(
      new PublicKey("BPFLoaderUpgradeab1e11111111111111111111111"),
      [program.programId]
    );

    const instruction = program.methods.initializeGlobalState().accounts({
      admin: ctx.provider.wallet.publicKey,
      globalState: globalStateKey,
      globalVault: globalVaultKey,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
      program: program.programId,
      programData,
    });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
