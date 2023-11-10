import { cosmicIdentityCtx } from "../sdk";
import { campaignState, globalState } from "../accounts";
import { toBN } from "../utils";

export function completeOrder(ctx: cosmicIdentityCtx) {
  return async (campaignId: bigint) => {
    const getGlobalState = globalState(ctx);
    const getCampaignState = campaignState(ctx);
    const globalStateKey = (await getGlobalState()).key;
    const campaignStateKey = (
      await getCampaignState(toBN(campaignId).toString())
    ).key;
    // TODO: need to check if u64 string for findProgramAddress is same address with using to_le_bytes in SC

    const program = ctx.program;

    const instruction = program.methods
      .completeOrder(toBN(BigInt(campaignId)))
      .accounts({
        influencer: ctx.provider.wallet.publicKey,
        globalState: globalStateKey,
        campaignState: campaignStateKey,
      });
    const tx = await instruction.rpc({ commitment: "confirmed" });
    return tx;
  };
}
