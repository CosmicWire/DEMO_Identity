import { cosmicIdentityCtx } from "../sdk";
import { globalState } from "../accounts";
import { ScaleType } from "../types";

export function removeGlobalScales(ctx: cosmicIdentityCtx) {
  return async (scaleType: ScaleType, index: number) => {
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
      .removeGlobalScales(type, index)
      .accounts({
        admin: ctx.provider.wallet.publicKey,
        globalState: globalStateKey,
      });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
