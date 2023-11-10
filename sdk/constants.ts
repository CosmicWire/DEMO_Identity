import { PublicKey } from "@solana/web3.js";

export const CAMPAIGN_STATE_SEED = "campaign_state_seed";
export const GLOBAL_STATE_SEED = "global_state_seed";
export const GLOBAL_VAULT_SEED = "global_vault_seed";
export const INFLUENCER_INFO_SEED = "influencer_seed";
export const POINT_STATE_SEED = "point_state_seed";

export const GLOBAL_PDA_DATA_SIZE = 779; // 8 + 32 + 8 + 8 * 4 + 8 * 7 + 161 * 3 + 160
export const CAMPAIGN_PDA_DATA_SIZE = 162; // 8 + 8 + 32 + 32 + 8 + 8 + 8 + 1 + 8 + 8 + 8 + 1 + 32
export const INFLUENCER_PDA_DATA_SIZE = 81; // 8 + 32 + 8 + 8 + 8 + 8 + 9

export const SECONDS_PER_MONTH = 2592000; // 30 * 24 * 60 * 60s

export const COST_TOKEN_MINT_PUBKEY = new PublicKey(
  "grnd8GAcyi7MgEdwNJ7qx6kFHbsxfeTsPKysjbyXBHk"
); // UDSC
