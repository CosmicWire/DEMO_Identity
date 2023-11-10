import { cosmicIdentityCtx } from "../sdk";
import { globalState } from "../accounts";
import { PublicKey } from "@solana/web3.js";

export function transferGlobalAdmin(ctx: cosmicIdentityCtx) {
  return async (newAdmin: PublicKey) => {
    const getGlobalState = globalState(ctx);
    const globalStateKey = (await getGlobalState()).key;

    const program = ctx.program;

    const instruction = program.methods.transferGlobalAdmin(newAdmin).accounts({
      admin: ctx.provider.wallet.publicKey,
      globalState: globalStateKey,
    });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
