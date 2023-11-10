import { cosmicIdentityCtx } from "../sdk";
import { globalState } from "../accounts";
import { toBN } from "../utils";

export function setGlobalFees(ctx: cosmicIdentityCtx) {
  return async (
    feeNumerator?: bigint,
    feeDenumerator?: bigint,
    maxMintedValue?: bigint,
    minFee?: bigint,
    beginMintingMonth?: bigint,
    minMintedValue?: bigint,
    mintStep?: bigint,
  ) => {
    const getGlobalState = globalState(ctx);
    const globalStateKey = (await getGlobalState()).key;

    const program = ctx.program;

    const instruction = program.methods
      .setGlobalFees(
        !feeNumerator ? null : toBN(feeNumerator),
        !feeDenumerator ? null : toBN(feeDenumerator),
        !maxMintedValue ? null : toBN(maxMintedValue),
        !minFee ? null : toBN(minFee),
        !beginMintingMonth ? null : toBN(beginMintingMonth),
        !minMintedValue ? null : toBN(minMintedValue),
        !mintStep ? null : toBN(mintStep),
      )
      .accounts({
        admin: ctx.provider.wallet.publicKey,
        globalState: globalStateKey,
      });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
