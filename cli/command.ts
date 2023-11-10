#!/usr/bin/env ts-node
import { program } from "commander";
import { PublicKey } from "@solana/web3.js";
import {
  acceptOrder,
  addGlobalScale,
  approveResult,
  cancelInfluencerBoost,
  claimAutoApprove,
  claimDelayedOrder,
  claimOrder,
  completeOrder,
  createOrder,
  getCampaignState,
  getGlobalStateInfo,
  getInfluencerPointState,
  getInfluencerState,
  initGlobal,
  initInfluencer,
  rejectOrder,
  rejectResult,
  removeGlobalScale,
  setClusterConfig,
  setGlobalBoostMultiplier,
  setGlobalFees,
  setGlobalPeriods,
  setInfluencerBoost,
  transferAdminOwnership,
} from "./scripts";

program.version("0.0.1");

const clusterHelp = `
  Common Option - Cluster can be configured by env string: \
  mainnet-beta, testnet, devnet (default)\n`;

/// Check status of PDAs

programCommand("global_status")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Get Locking Contract Global PDA Info\n
  ${clusterHelp}`
  )
  .action(async (directory, cmd) => {
    const { env } = cmd.opts();
    console.log("Solana config: ", env);
    await setClusterConfig(env);

    console.log("globalInfo =", await getGlobalStateInfo());
  });

programCommand("point_status")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Get influencer point state info\n
    Return global point state if not pass influencer address
  ${clusterHelp}`
  )
  .option("-a, --address <string>", "The influencer address")
  .action(async (directory, cmd) => {
    const { env, address } = cmd.opts();

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    console.log(
      await getInfluencerPointState(
        address ? new PublicKey(address) : undefined
      )
    );
  });

programCommand("influencer_status")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Get influencer state info
  ${clusterHelp}`
  )
  .requiredOption("-a, --address <string>", "The influencer address")
  .action(async (directory, cmd) => {
    const { env, address } = cmd.opts();

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    console.log(await getInfluencerState(new PublicKey(address)));
  });

programCommand("campaign_status")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Get campaign state info
  ${clusterHelp}`
  )
  .requiredOption("-c, --campaign-id <string>", "The campaign id")
  .action(async (directory, cmd) => {
    const { env, campaignId } = cmd.opts();

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    console.log(await getCampaignState(campaignId));
  });

/// Config global settings as Admin

programCommand("set_config_multiplier")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Config global boost multipliers
  ${clusterHelp}`
  )
  .requiredOption("-t, --type <string>", "The boost type")
  .requiredOption("-n, --numerator <number>", "The multiplier numerator")
  .requiredOption("-d, --denumerator <number>", "The multiplier denumerator")
  .action(async (directory, cmd) => {
    const { env, type, numerator, denumerator } = cmd.opts();

    if (isNaN(parseInt(numerator))) {
      console.log("Error input numerator");
      return;
    }

    if (numerator < 0) {
      throw "Invalid numerator value";
    }

    if (isNaN(parseInt(denumerator))) {
      console.log("Error input denumerator");
      return;
    }

    if (denumerator < 1) {
      throw "Invalid denumerator value";
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await setGlobalBoostMultiplier(type, numerator, denumerator);
  });

programCommand("set_config_fees")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Config global fee related thresholds
  ${clusterHelp}`
  )
  .option("--fee-numerator <number>", "The Fee Numerator")
  .option("--fee-denumerator <number>", "The Fee Denumerator")
  .option("--max-minted <number>", "The Max Minted Value")
  .option("--min-fee <number>", "The Min Fee")
  .option("--begin-month <number>", "The Begin Minting Month")
  .option("--min-minted <number>", "The Min Minted Value")
  .option("--mint-step <number>", "The Mint Step")
  .action(async (directory, cmd) => {
    const {
      env,
      feeNumerator,
      feeDenumerator,
      maxMinted,
      minFee,
      beginMonth,
      minMinted,
      mintStep,
    } = cmd.opts();

    if (feeNumerator) {
      if (isNaN(parseInt(feeNumerator))) {
        console.log("Error input feeNumerator");
        return;
      }
      if (feeNumerator < 0) {
        throw "Invalid feeNumerator value";
      }
    }

    if (feeDenumerator) {
      if (isNaN(parseInt(feeDenumerator))) {
        console.log("Error input feeDenumerator");
        return;
      }
      if (feeDenumerator < 1) {
        throw "Invalid feeDenumerator value";
      }
    }

    if (beginMonth) {
      if (isNaN(parseInt(beginMonth))) {
        console.log("Error input beginMonth");
        return;
      }
      if (beginMonth < 0) {
        throw "Invalid beginMonth value";
      }
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await setGlobalFees(
      feeNumerator,
      feeDenumerator,
      maxMinted,
      minFee,
      beginMonth,
      minMinted,
      mintStep
    );
  });

programCommand("set_config_periods")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Config global periods in seconds
  ${clusterHelp}`
  )
  .option("--release-period <number>", "The Release Period")
  .option("--accept-period <number>", "The Accept Period")
  .option("--claim-after <number>", "The Claim After Time")
  .option("--approve-result <number>", "The Approve Result Time")
  .action(async (directory, cmd) => {
    const { env, releasePeriod, acceptPeriod, claimAfter, approveResult } =
      cmd.opts();

    if (releasePeriod) {
      if (isNaN(parseInt(releasePeriod))) {
        console.log("Error input releasePeriod");
        return;
      }
      if (releasePeriod < 0) {
        throw "Invalid releasePeriod value";
      }
    }

    if (acceptPeriod) {
      if (isNaN(parseInt(acceptPeriod))) {
        console.log("Error input acceptPeriod");
        return;
      }
      if (acceptPeriod < 1) {
        throw "Invalid acceptPeriod value";
      }
    }

    if (claimAfter) {
      if (isNaN(parseInt(claimAfter))) {
        console.log("Error input claimAfter");
        return;
      }
      if (claimAfter < 0) {
        throw "Invalid claimAfter value";
      }
    }

    if (approveResult) {
      if (isNaN(parseInt(approveResult))) {
        console.log("Error input approveResult");
        return;
      }
      if (approveResult < 0) {
        throw "Invalid approveResult value";
      }
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await setGlobalPeriods(
      releasePeriod,
      acceptPeriod,
      claimAfter,
      approveResult
    );
  });

programCommand("transfer_admin")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Transfer global admin authority to another address
  ${clusterHelp}`
  )
  .requiredOption("-a, --address <string>", "The new admin address")
  .action(async (directory, cmd) => {
    const { env, address } = cmd.opts();

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await transferAdminOwnership(address);
  });

programCommand("add_global_scale")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Add global Scale Config
  ${clusterHelp}`
  )
  .requiredOption("-t, --type <string>", "The scale type")
  .requiredOption("-b, --bound <number>", "The scale bound")
  .requiredOption("-v, --value <number>", "The scale value")
  .action(async (directory, cmd) => {
    const { env, type, bound, value } = cmd.opts();

    if (isNaN(parseInt(bound))) {
      console.log("Error input bound");
      return;
    }

    if (bound < 0) {
      throw "Invalid bound value";
    }

    if (isNaN(parseInt(value))) {
      console.log("Error input value");
      return;
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await addGlobalScale(type, bound, value);
  });

programCommand("remove_global_scale")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Remove global Scale Config
  ${clusterHelp}`
  )
  .requiredOption("-t, --type <string>", "The scale type")
  .requiredOption("-i, --index <number>", "The scale config index")
  .action(async (directory, cmd) => {
    const { env, type, index } = cmd.opts();

    if (isNaN(parseInt(index))) {
      console.log("Error input index");
      return;
    }

    if (index < 0) {
      throw "Invalid index value";
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await removeGlobalScale(type, index);
  });

programCommand("init_global")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Initialize Global PDA of contract
  ${clusterHelp}`
  )
  .action(async (directory, cmd) => {
    const { env } = cmd.opts();
    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await initGlobal();
  });

/// User Actions

programCommand("init_influencer")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Initialize Influencer PDA and his point state PDA
  ${clusterHelp}`
  )
  .action(async (directory, cmd) => {
    const { env } = cmd.opts();
    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await initInfluencer();
  });

programCommand("set_influencer_boost")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Config influencer boost setting
  ${clusterHelp}`
  )
  .requiredOption("-t, --type <string>", "The boost type")
  .requiredOption("-x, --expires-at <number>", "The boost expires time")
  .action(async (directory, cmd) => {
    const { env, type, expiresAt } = cmd.opts();

    if (isNaN(parseInt(expiresAt))) {
      console.log("Error input expiresAt");
      return;
    }

    if (expiresAt < 0) {
      throw "Invalid expiresAt value";
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await setInfluencerBoost(type, expiresAt);
  });

programCommand("cancel_influencer_boost")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Cancel influencer boost setting
  ${clusterHelp}`
  )
  .requiredOption("-t, --type <string>", "The boost type")
  .requiredOption("-x, --expires-at <number>", "The boost expires time")
  .action(async (directory, cmd) => {
    const { env, type, expiresAt } = cmd.opts();

    if (isNaN(parseInt(expiresAt))) {
      console.log("Error input expiresAt");
      return;
    }

    if (expiresAt < 0) {
      throw "Invalid expiresAt value";
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await cancelInfluencerBoost(type, expiresAt);
  });

programCommand("create_order")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Create a new campaign for order as brand
  ${clusterHelp}`
  )
  .requiredOption("-t, --type <string>", "The order type")
  .requiredOption("-a, --address <string>", "The influencer address")
  .requiredOption("-r, --release-date <number>", "The campaign release date")
  .requiredOption("-p, --price <number>", "The order price")
  .requiredOption("-d, --data <string>", "The campaign raw data")
  .action(async (directory, cmd) => {
    const { env, type, address, releaseDate, price, data } = cmd.opts();

    if (isNaN(parseInt(releaseDate))) {
      console.log("Error input releaseDate");
      return;
    }
    if (releaseDate < 0) {
      throw "Invalid releaseDate value";
    }

    const rawData = new Buffer(data);

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await createOrder(address, type, releaseDate, price, rawData);
  });

programCommand("accept_order")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Accept a campaign for order as influencer
  ${clusterHelp}`
  )
  .requiredOption("-c, --campaign-id <number>", "The campaign id")
  .action(async (directory, cmd) => {
    const { env, campaignId } = cmd.opts();

    if (isNaN(parseInt(campaignId))) {
      console.log("Error input campaignId");
      return;
    }
    if (campaignId < 0) {
      throw "Invalid campaignId value";
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await acceptOrder(campaignId);
  });

programCommand("reject_order")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Reject a campaign for order as influencer
  ${clusterHelp}`
  )
  .requiredOption("-c, --campaign-id <number>", "The campaign id")
  .action(async (directory, cmd) => {
    const { env, campaignId } = cmd.opts();

    if (isNaN(parseInt(campaignId))) {
      console.log("Error input campaignId");
      return;
    }
    if (campaignId < 0) {
      throw "Invalid campaignId value";
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await rejectOrder(campaignId);
  });

programCommand("complete_order")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Complete order of campaign as influencer
  ${clusterHelp}`
  )
  .requiredOption("-c, --campaign-id <number>", "The campaign id")
  .action(async (directory, cmd) => {
    const { env, campaignId } = cmd.opts();

    if (isNaN(parseInt(campaignId))) {
      console.log("Error input campaignId");
      return;
    }
    if (campaignId < 0) {
      throw "Invalid campaignId value";
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await completeOrder(campaignId);
  });

programCommand("claim_order")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Claim invalid order of campaign as brand
  ${clusterHelp}`
  )
  .requiredOption("-c, --campaign-id <number>", "The campaign id")
  .action(async (directory, cmd) => {
    const { env, campaignId } = cmd.opts();

    if (isNaN(parseInt(campaignId))) {
      console.log("Error input campaignId");
      return;
    }
    if (campaignId < 0) {
      throw "Invalid campaignId value";
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await claimOrder(campaignId);
  });

programCommand("claim_delayed_order")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Claim delayed order of campaign as brand
  ${clusterHelp}`
  )
  .requiredOption("-c, --campaign-id <number>", "The campaign id")
  .action(async (directory, cmd) => {
    const { env, campaignId } = cmd.opts();

    if (isNaN(parseInt(campaignId))) {
      console.log("Error input campaignId");
      return;
    }
    if (campaignId < 0) {
      throw "Invalid campaignId value";
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await claimDelayedOrder(campaignId);
  });

programCommand("approve_result")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Approve order result of campaign as brand
  ${clusterHelp}`
  )
  .requiredOption("-c, --campaign-id <number>", "The campaign id")
  .requiredOption("-s, --score <number>", "The result score")
  .action(async (directory, cmd) => {
    const { env, campaignId, score } = cmd.opts();

    if (isNaN(parseInt(campaignId))) {
      console.log("Error input campaignId");
      return;
    }
    if (campaignId < 0) {
      throw "Invalid campaignId value";
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await approveResult(campaignId, BigInt(score));
  });

programCommand("reject_result")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Approve order result of campaign as brand
  ${clusterHelp}`
  )
  .requiredOption("-c, --campaign-id <number>", "The campaign id")
  .action(async (directory, cmd) => {
    const { env, campaignId, score } = cmd.opts();

    if (isNaN(parseInt(campaignId))) {
      console.log("Error input campaignId");
      return;
    }
    if (campaignId < 0) {
      throw "Invalid campaignId value";
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await rejectResult(campaignId);
  });

programCommand("claim_auto_approve")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .description(
    `
    Auto approve order result as influencer
  ${clusterHelp}`
  )
  .requiredOption("-c, --campaign-id <number>", "The campaign id")
  .action(async (directory, cmd) => {
    const { env, campaignId, score } = cmd.opts();

    if (isNaN(parseInt(campaignId))) {
      console.log("Error input campaignId");
      return;
    }
    if (campaignId < 0) {
      throw "Invalid campaignId value";
    }

    console.log("Solana config: ", env);
    await setClusterConfig(env);

    await claimAutoApprove(campaignId);
  });

function programCommand(name: string) {
  return program.command(name).option(
    "-e, --env <string>",
    "Solana cluster env name",
    "devnet" //mainnet-beta, testnet, devnet
  );
}

program.parse(process.argv);
