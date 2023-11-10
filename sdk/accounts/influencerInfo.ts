import { AccountInfo, PublicKey } from "@solana/web3.js";
import { cosmicIdentityCtx } from "../sdk";
import { InfluencerInfo } from "../types";
import { INFLUENCER_INFO_SEED } from "../constants";

export const influencerInfo =
  (ctx: cosmicIdentityCtx) => async (owner: PublicKey) => {
    const programId = ctx.program.programId;
    const seeds = [INFLUENCER_INFO_SEED, owner];
    const parser = ctx.getParser<InfluencerInfo>(ctx.program, "influencerInfo");

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
