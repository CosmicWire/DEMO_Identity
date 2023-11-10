import { Coder, Program, AnchorProvider } from "@coral-xyz/anchor";
import { AccountInfo, Connection, PublicKey } from "@solana/web3.js";

import * as utils from "./utils";
import { Network, ProgramIds, Wallet } from "./types";
import * as cosmicIdentityIdl from "../target/types/cosmic_identity";
import {
  campaignState,
  globalState,
  influencerInfo,
  pointState,
} from "./accounts";
import {
  acceptOrder,
  addGlobalScales,
  approveResult,
  cancelInfluencerBoost,
  claimAutoApprove,
  claimDelayedOrder,
  claimOrder,
  completeOrder,
  createOrder,
  initializeGlobalPointState,
  initializeGlobalState,
  initializeInfluencer,
  initializeInfluencerPointState,
  rejectOrder,
  rejectResult,
  removeGlobalScales,
  setGlobalBoostMultiplier,
  setGlobalFees,
  setGlobalPeriods,
  setInfluencerBoost,
  transferGlobalAdmin,
} from "./methods";

function isNetwork(value: any): value is Network {
  return typeof value === "string";
}

export type cosmicIdentityCtx = ReturnType<typeof createCtx>;

export type CosmicIdentitySDK = ReturnType<typeof createCosmicIdentityApi>;

/**
 * Base object for instantiating the SDK for use on the client.
 */
export const CosmicIdentitySDK = {
  /**
   * Create an instance of the SDK.
   * @param network One of either `testnet`, `devnet` or `localnet` this informs which programIds are supplied to the system.
   * @param endpoint The RPC endpoint the application will be connecting to.
   * @param wallet An optional wallet to sign transactions. If left out a readonly SDK will be created.
   * @returns CosmicIdentityAPI
   */
  create(
    network: Network,
    connectionOrEndpoint: Connection | string,
    wallet?: Wallet
  ) {
    const programIds = utils.getProgramIds(network);
    const connection =
      typeof connectionOrEndpoint === "string"
        ? new Connection(connectionOrEndpoint)
        : connectionOrEndpoint;
    let ctx;
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      ctx = createCtx(provider, programIds.cosmicIdentity, network);
    } else {
      // Create readonly provider
      const provider = new AnchorProvider(
        connection,
        utils.createFakeWallet(),
        {}
      );
      ctx = createCtx(provider, programIds.cosmicIdentity, network);
    }
    return createCosmicIdentityApi(ctx);
  },

  /**
   * Creates an SDK instance configured for tests using an anchor provider.
   * @param provider Anchor provider
   * @param programIdsOrNetwork Map of program ids to build off for testing or a network string
   * @returns CosmicIdentityAPI
   */
  fromAnchorProvider(
    provider: AnchorProvider,
    programIdsOrNetwork: ProgramIds | Network
  ) {
    const programIds = isNetwork(programIdsOrNetwork)
      ? utils.getProgramIds(programIdsOrNetwork)
      : programIdsOrNetwork;
    const network = isNetwork(programIdsOrNetwork)
      ? programIdsOrNetwork
      : undefined;
    const ctx = createCtx(provider, programIds.cosmicIdentity, network);
    return createCosmicIdentityApi(ctx);
  },
};

export const createCosmicIdentityApi = (ctx: cosmicIdentityCtx) => {
  return {
    accounts: {
      campaignState: campaignState(ctx),
      globalState: globalState(ctx),
      influencerInfo: influencerInfo(ctx),
      pointState: pointState(ctx),
    },
    methods: {
      acceptOrder: acceptOrder(ctx),
      addGlobalScales: addGlobalScales(ctx),
      approveResult: approveResult(ctx),
      cancelInfluencerBoost: cancelInfluencerBoost(ctx),
      claimAutoApprove: claimAutoApprove(ctx),
      claimDelayedOrder: claimDelayedOrder(ctx),
      claimOrder: claimOrder(ctx),
      completeOrder: completeOrder(ctx),
      createOrder: createOrder(ctx),
      initializeGlobalPointState: initializeGlobalPointState(ctx),
      initializeGlobalState: initializeGlobalState(ctx),
      initializeInfluencer: initializeInfluencer(ctx),
      initializeInfluencerPointState: initializeInfluencerPointState(ctx),
      rejectOrder: rejectOrder(ctx),
      rejectResult: rejectResult(ctx),
      removeGlobalScales: removeGlobalScales(ctx),
      setGlobalBoostMultiplier: setGlobalBoostMultiplier(ctx),
      setGlobalFees: setGlobalFees(ctx),
      setGlobalPeriods: setGlobalPeriods(ctx),
      setInfluencerBoost: setInfluencerBoost(ctx),
      transferGlobalAdmin: transferGlobalAdmin(ctx),
    },
    utils: {},
    ctx,
  };
};

/**
 * Create context from within an anchor test
 * @param provider Anchor provider
 * @param programIds A map of programIds for the SDK
 * @param network The network the connection is attached to
 * @returns Ctx
 */
export function createCtx(
  provider: AnchorProvider,
  programId: string,
  network: Network = Network.LOCALNET
) {
  function isSignedIn() {
    return provider.wallet.publicKey !== PublicKey.default;
  }
  const cosmicIdentity = new Program(
    cosmicIdentityIdl.IDL,
    programId,
    provider
  );

  /**
   * Lookup public key from initial programIds
   * @param name
   * @returns
   */
  function getKey() {
    return new PublicKey(programId);
  }

  /**
   * Create a parser function to parse using the given coder
   * @param program
   * @param name
   * @returns
   */
  function getParser<T>(program: { coder: Coder }, name: string) {
    return (info: AccountInfo<Buffer>) =>
      program.coder.accounts.decode(name, info.data) as T;
  }

  return {
    connection: provider.connection,
    wallet: provider.wallet,
    program: cosmicIdentity,
    provider,
    getKey,
    getParser,
    isSignedIn,
    network,
    utils,
  };
}
