import { cosmicIdentityCtx } from "../sdk";
import { campaignState } from "../accounts";
import { toBN } from "../utils";

export function rejectResult(ctx: cosmicIdentityCtx) {
  return async (campaignId: bigint) => {
    const getCampaignState = campaignState(ctx);
    const campaignStateKey = (
      await getCampaignState(toBN(campaignId).toString())
    ).key;
    // TODO: need to check if u64 string for findProgramAddress is same address with using to_le_bytes in SC

    const program = ctx.program;

    const instruction = program.methods
      .rejectResult(toBN(BigInt(campaignId)))
      .accounts({
        brand: ctx.provider.wallet.publicKey,
        campaignState: campaignStateKey,
      });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
