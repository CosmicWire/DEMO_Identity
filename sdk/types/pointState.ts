import { PublicKey } from "@solana/web3.js";

export type Checkpoint = {
  monthId: bigint;
  value: bigint;
};

export type PointState = {
  owner: PublicKey;
  pointsByMonth: Checkpoint[];
};
