import { AccountInfo, PublicKey } from "@solana/web3.js";
import { cosmicIdentityCtx } from "../sdk";
import { PointState } from "../types";
import { POINT_STATE_SEED } from "../constants";

export const pointState =
  (ctx: cosmicIdentityCtx) => async (owner: PublicKey) => {
    const programId = ctx.program.programId;
    const seeds = [POINT_STATE_SEED, owner];
    const parser = ctx.getParser<PointState>(ctx.program, "pointState");

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
