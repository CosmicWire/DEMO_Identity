import { cosmicIdentityCtx } from "../sdk";
import { globalState } from "../accounts";
import { toBN } from "../utils";

export function setGlobalPeriods(ctx: cosmicIdentityCtx) {
  return async (
    releasePeriod?: bigint,
    acceptPeriod?: bigint,
    claimAfter?: bigint,
    approvePeriod?: bigint,
  ) => {
    const getGlobalState = globalState(ctx);
    const globalStateKey = (await getGlobalState()).key;

    const program = ctx.program;

    const instruction = program.methods
      .setGlobalPeriods(
        !releasePeriod ? null : toBN(releasePeriod),
        !acceptPeriod ? null : toBN(acceptPeriod),
        !claimAfter ? null : toBN(claimAfter),
        !approvePeriod ? null : toBN(approvePeriod),
      )
      .accounts({
        admin: ctx.provider.wallet.publicKey,
        globalState: globalStateKey,
      });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
