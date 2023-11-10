import { cosmicIdentityCtx } from "../sdk";
import { globalState } from "../accounts";
import { toBN } from "../utils";
import { ScaleType } from "../types";

export function addGlobalScales(ctx: cosmicIdentityCtx) {
  return async (scaleType: ScaleType, bound: bigint, value: bigint) => {
    const getGlobalState = globalState(ctx);
    const globalStateKey = (await getGlobalState()).key;

    const program = ctx.program;

    let type = {};
    switch (scaleType) {
      case ScaleType.AcceptOrder:
        type = { acceptOrder: {} };
        break;
      case ScaleType.ApproveResults:
        type = { approveResults: {} };
        break;
      case ScaleType.CompleteOrder:
        type = { completeOrder: {} };
        break;
    }

    const instruction = program.methods
      .addGlobalScales(type, toBN(bound), toBN(value))
      .accounts({
        admin: ctx.provider.wallet.publicKey,
        globalState: globalStateKey,
      });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
