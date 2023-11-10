import { cosmicIdentityCtx } from "../sdk";
import { influencerInfo } from "../accounts";
import { BoostType } from "../types";
import { toBN } from "../utils";

export function setInfluencerBoost(ctx: cosmicIdentityCtx) {
  return async (boostType: BoostType, expiresAt: bigint) => {
    const getInfluencerInfo = influencerInfo(ctx);
    const influencerInfoKey = (
      await getInfluencerInfo(ctx.provider.wallet.publicKey)
    ).key;

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
      .setInfluencerBoost(type, toBN(expiresAt))
      .accounts({
        influencer: ctx.provider.wallet.publicKey,
        influencerInfo: influencerInfoKey,
      });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
