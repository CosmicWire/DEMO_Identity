import { AccountInfo } from "@solana/web3.js";
import { cosmicIdentityCtx } from "../sdk";
import { GlobalState } from "../types";
import { GLOBAL_STATE_SEED, GLOBAL_VAULT_SEED } from "../constants";

export const globalState = (ctx: cosmicIdentityCtx) => async () => {
  const programId = ctx.program.programId;
  const seeds = [GLOBAL_STATE_SEED];
  const parser = ctx.getParser<GlobalState>(ctx.program, "globalState");

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

export const globalVault = (ctx: cosmicIdentityCtx) => async () => {
  const programId = ctx.program.programId;
  const seeds = [GLOBAL_VAULT_SEED];
  const [key] = await ctx.utils.getPDA(programId, seeds);

  async function balance() {
    const bal = await ctx.connection.getTokenAccountBalance(key);
    return BigInt(bal.value.amount);
  }
  return {
    key,
    balance,
  };
};
