import { PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import * as SPLToken from "@solana/spl-token";

import GlobalConfig from "../../global_config.json";
import { Network, ProgramIds, Wallet } from "../types";
import BN from "bn.js";

export function getProgramIds(connection: Network): ProgramIds {
  const { programIds } = GlobalConfig[connection];
  return programIds;
}

/**
 * Gets a PDA derived based on seed
 * @param programId ProgramID to derive this key from
 * @param seeds array of seeds
 * @returns
 */
export async function getPDA(
  programId: PublicKey,
  seeds: (PublicKey | string | number | bigint)[]
) {
  const parsedSeeds = seeds.map((seed) => {
    if (typeof seed === "string") return encodeString(seed);
    if (typeof seed === "number") return encodeUInt32(seed);
    if (typeof seed === "bigint") return encodeUInt64(seed);
    return seed.toBuffer();
  });

  const [pubkey, bump] = await PublicKey.findProgramAddress(
    parsedSeeds,
    programId
  );
  return [pubkey, bump] as [typeof pubkey, typeof bump];
}

function encodeString(input: string) {
  return anchor.utils.bytes.utf8.encode(input);
}

function encodeUInt32(input: number) {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(input);
  return new Uint8Array(b);
}

function encodeUInt64(input: bigint) {
  const b = toBN(BigInt(input)).toArrayLike(Buffer, "le", 8);
  return new Uint8Array(b);
}

// create a fake wallet for when we are signed out.
export function createFakeWallet(publicKey = PublicKey.default): Wallet {
  const createSignedInError = () =>
    new Error("You must connect a wallet to sign a transaction.");
  return {
    publicKey,

    signAllTransactions: () => {
      throw createSignedInError();
    },
    signTransaction: () => {
      throw createSignedInError();
    },
  };
}

export async function findAssociatedTokenAddress(
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
): Promise<PublicKey> {
  return await SPLToken.getAssociatedTokenAddress(
    tokenMintAddress, // mint
    walletAddress, // token account authority
    true,
    SPLToken.TOKEN_PROGRAM_ID, // always token program id
    SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID // always associated token program id
  );
}

export function toBigInt(amount: BN): bigint {
  return BigInt(amount.toString());
}

export function toBN(amount: bigint): BN {
  const str = amount.toString();
  return new BN(str);
}
