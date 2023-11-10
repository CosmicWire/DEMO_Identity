import { cosmicIdentityCtx } from "../sdk";
import { globalState } from "../accounts";
import { toBN } from "../utils";
import { BoostType } from "../types";

export function setGlobalBoostMultiplier(ctx: cosmicIdentityCtx) {
  return async (
    boostType: BoostType,
    numerator: bigint,
    denumerator: bigint
  ) => {
    const getGlobalState = globalState(ctx);
    const globalStateKey = (await getGlobalState()).key;

    const program = ctx.program;

    let type = {};
    switch (boostType) {
      case BoostType.Type0:
        type = { type0: {} };
        break;
      case BoostType.Type1:
        type = { type1: {} };
        break;
      case BoostType.Type2:
        type = { type2: {} };
        break;
      case BoostType.Type3:
        type = { type3: {} };
        break;
    }

    const instruction = program.methods
      .setGlobalBoostMultiplier(type, toBN(numerator), toBN(denumerator))
      .accounts({
        admin: ctx.provider.wallet.publicKey,
        globalState: globalStateKey,
      });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
