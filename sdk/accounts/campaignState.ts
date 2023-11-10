import { AccountInfo } from "@solana/web3.js";
import { cosmicIdentityCtx } from "../sdk";
import { CampaignState } from "../types";
import { CAMPAIGN_STATE_SEED } from "../constants";

export const campaignState =
  (ctx: cosmicIdentityCtx) => async (campaignId: string) => {
    const programId = ctx.program.programId;
    const seeds = [CAMPAIGN_STATE_SEED, BigInt(campaignId)];
    const parser = ctx.getParser<CampaignState>(ctx.program, "campaignState");

    const [key, bump] = await ctx.utils.getPDA(programId, seeds);

    async function data() {
      let info: AccountInfo<Buffer> | null = null;
      try {
        const res = await ctx.connection.getAccountInfo(key);
        if (res && res.data) {
          info = res;
        }
      } catch (e) {
        throw new Error("info couldnt be fetched for " + key.toString());
      }
      return !info
        ? null
        : {
            ...info,
            data: parser(info),
          };
    }

    return { key, bump, data };
  };
