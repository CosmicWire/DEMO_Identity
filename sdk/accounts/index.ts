import { PublicKey } from "@solana/web3.js";
import { cosmicIdentityCtx } from "../sdk";

export * from "./campaignState";
export * from "./globalState";
export * from "./influencerInfo";
export * from "./pointState";

export const userCostToken =
  (ctx: cosmicIdentityCtx) =>
  async (tokenMint: PublicKey, owner: PublicKey) => {
    const key = await ctx.utils.findAssociatedTokenAddress(owner, tokenMint);
    async function balance() {
      const bal = await ctx.connection.getTokenAccountBalance(key);
      return BigInt(bal.value.amount);
    }
    return {
      key,
      balance,
    };
  };
