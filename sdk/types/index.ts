export * from "./campaignState";
export * from "./globalState";
export * from "./influencerInfo";
export * from "./pointState";

import { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";

export enum Network {
  MAINNET_BETA = "mainnet-beta",
  TESTNET = "testnet",
  DEVNET = "devnet",
  LOCALNET = "localnet",
  FAKE_MAINNET = "fake-mainnet",
}

export type ProgramIds = {
  cosmicIdentity: string;
};

export type NetworkConfig = {
  programIds: ProgramIds;
};

export type NetworkMap = Record<Network, NetworkConfig>;

export type Wallet = {
  signTransaction<T extends Transaction | VersionedTransaction>(
    tx: T
  ): Promise<T>;
  signAllTransactions<T extends Transaction | VersionedTransaction>(
    txs: T[]
  ): Promise<T[]>;
  publicKey: PublicKey;
};
