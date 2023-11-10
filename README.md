# PoC-Cosmic-Identity-RUST

PoC Universal Cosmic Identity Solution in Rust

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisiites)
- [Installation](#installation)
- [Features](#features)
  - [As a Smart Contract Owner](#as-a-smart-contract-owner)
  - [As an Admin](#as-an-admin)
  - [As a User](#as-a-user)
- [Account Structures](#account-structures)
  - [Global State](#global-state)
  - [Campaign State](#campaign-state)
  - [Influencer Info](#influencer-info)
  - [Point State](#point-state)

## Overview

This program allows identical influencers to create order and get delivered.

## Prerequisiites

```script
- $ solana --version
solana-cli 1.14.17 (src:b29a37cf; feat:3488713414)
```

<br/>

```script
- $ anchor --version
anchor-cli 0.27.0
```

use avm to install and use desired version: <br/>

`cargo install --git https://github.com/project-serum/anchor avm --locked --force` see [here](https://book.anchor-lang.com/getting_started/installation.html?highlight=avm#installing-using-anchor-version-manager-avm-recommended)

You might need to run this first <br/>
`sudo apt install pkg-config libssl-dev`
<br/><br/>

```script
- $ node --version
v18.13.0
```

<br/>

```script
- $ yarn --version
1.22.19
```

use `npm install --global yarn@1.22.19`
<br/><br/>

```script
- $ cargo --version
cargo 1.70.0 (ec8a8a0ca 2023-04-25)
```

`rustup install 1.70.0` and then if needed `rustup override set 1.70.0`
<br/><br/>

## Installation

You should know how to use Anchor by now or we should be talking...

## Features

### As a Smart Contract Owner

For the first time use, the Smart Contract Owner should `initializeGlobalState` the Smart Contract for global account allocation.
And also should `initializeGlobalPointState` for allocation of account for totalPoints measurement.

```ts
await CosmicIdentitySDK.methods.initializeGlobaState();
await CosmicIdentitySDK.methods.initializeGlobaPointState();
```

### As an Admin

Admin able to configure global thresholds and also transfer admin ownership.

```ts
await CosmicIdentitySDK.methods.setGlobalBoostMultiplier(
  boostType,
  numerator,
  denumerator
);
await CosmicIdentitySDK.methods.setGlobalFees(
  feeNumerator,
  feeDenumerator,
  maxMintedValue,
  minFee,
  beginMintingMonth,
  minMintedValue,
  mintStep
);
await CosmicIdentitySDK.methods.setGlobalPeriod(
  releasePeriod,
  acceptPeriod,
  claimAfter,
  approvePeriod
);
await CosmicIdentitySDK.methods.addGlobalScales(scaleType, bound, value);
await CosmicIdentitySDK.methods.removeGlobalScales(scaleType, index);
await CosmicIdentitySDK.methods.transferAdmin(newAdmin);
```

### As a User

All users (brand/influencer) should `initializeInfluencerPointState` and `initializeInfluencer` to allocate accounts for first time use.

```ts
await CosmicIdentitySDK.methods.initializeInfluencerPointState();
await CosmicIdentitySDK.methods.initializeInfluencer();
```

Users able to set/cancel boost config

```ts
await CosmicIdentitySDK.methods.setInfluencerBoost(boostType, expiresAt);
await CosmicIdentitySDK.methods.cancelInfluencerBoost(boostType, expiresAt);
```

Brand creates a new order.

```ts
await CosmicIdentitySDK.methods.createOrder(
  influencer,
  orderType,
  releaseDate,
  price,
  data
);
```

Influencer accept or reject the order.

```ts
await CosmicIdentitySDK.methods.acceptOrder(campaignID);
await CosmicIdentitySDK.methods.rejectOrder(campaignID);
```

Brand claim order for created order which passed `accept_period_in_seconds` time and about the rejected orders.

```ts
await CosmicIdentitySDK.methods.claimOrder(campaignID);
```

Brand claim delayed order for accepted but `claim_after_in_seconds` time passed from `release_date` to complete order.

```ts
await CosmicIdentitySDK.methods.claimDelayedOrder(campaignID);
```

Influencer complete order after deliver product.

```ts
await CosmicIdentitySDK.methods.completeOrder(campaignID);
```

Brand approve / reject the result of their delivery.

```ts
await CosmicIdentitySDK.methods.approveResult(campaignID, score);
await CosmicIdentitySDK.methods.rejectResult(campaignID);
```

If brand doesn't act in time, influencer able to claim auto approved when `approve_period_in_seconds` time is passed.

```ts
await CosmicIdentitySDK.methods.claimAutoApprove(campaignID);
```

## Account Structures

### Global State

PDA to represent program global configurations. Refer to the layout from the `sdk/accounts/globalState.ts`.
<br/><br/>

- Involves admin address and total created campaigns count value as global info.

```ts
admin: PublicKey;
totalCampaignCount: bigint;
```

 <br/>
 
- Involves threshoulds from the [`Config.sol`](https://github.com/CosmicWire/PoC-Cosmic-Identity/blob/6fa21ef16652eb7f1c3e1dc47defb5aa8a20d9b3/contract/Config.sol#L21) numbers configs. 
``` ts
  // thresholds
  releasePeriodInSeconds: bigint;
  acceptPeriodInSeconds: bigint;
  claimAfterInSeconds: bigint;
  approvePeriodInSeconds: bigint;

feeNumerator: bigint;
feeDenumerator: bigint;
maxMinted_value: bigint;
minFee: bigint;
beginMintingMonth: bigint;
minMinted_value: bigint;
mintStep: bigint;

````
 <br/>

- Involves scales config from the [`Config.sol`](https://github.com/CosmicWire/PoC-Cosmic-Identity/blob/6fa21ef16652eb7f1c3e1dc47defb5aa8a20d9b3/contract/Config.sol#L22) scales configs.
``` ts
  // scales
  acceptOrderTimeRewardCount: number;
  acceptOrderTimeReward: ScaleValue[];
  completeOrderTimeRewardCount: number;
  completeOrderTimeReward: ScaleValue[];
  approveResultsScoreRewardCount: number;
  approveResultsScoreReward: ScaleValue[];
````

`ScaleValue` has same structure with the `Value` struct from [`Config.sol`](https://github.com/CosmicWire/PoC-Cosmic-Identity/blob/6fa21ef16652eb7f1c3e1dc47defb5aa8a20d9b3/contract/Config.sol#L15C13-L15C13).

```ts
bound: bigint;
value: bigint;
```

 <br/>
 
- Involves boost multiplier configs from the [`Boost.sol`](https://github.com/CosmicWire/PoC-Cosmic-Identity/blob/6fa21ef16652eb7f1c3e1dc47defb5aa8a20d9b3/contract/Boost.sol#L15) boost multipliers.
``` ts
  // boost
  boostMultipliers: Multiplier[];
```

Multiplier struct is same as the [`Boost.sol`](https://github.com/CosmicWire/PoC-Cosmic-Identity/blob/6fa21ef16652eb7f1c3e1dc47defb5aa8a20d9b3/contract/Boost.sol#L10C24-L10C24).

```ts
numerator: bigint;
denumerator: bigint;
```

<br/>

### Campaign State

PDA to represent each order campaign. Refer to the layout from the `sdk/accounts/campaignState.ts`.
<br/><br/>

This PDA involves all fields of the `Campaign` from [`Cosmic.sol`](https://github.com/CosmicWire/PoC-Cosmic-Identity/blob/6fa21ef16652eb7f1c3e1dc47defb5aa8a20d9b3/contract/Cosmic.sol#L65).
Also has one more field - `id` which represents the campaignID (key of mapping).

```ts
  id: bigint,
  brand: PublicKey,              // brand address to book campaign
  influencer: PublicKey,         // influencer address to book campaign
  releaseDate: bigint,           // dateAds for booking ads campaign (the 1st second of the dateAds)
  orderCreationTime: bigint,     // time when the order is created
  orderCompletionTime: bigint,   // time when the ads was completed by influencer
  orderType: OrderType,          // 1 - post, 2 - repost, 3 - post+pin24
  price: bigint,                 // how much paid in total by brand in USDC
  fee: bigint,
  rating: bigint,                // sum points which influencer is receiving during the campaign
  status: CampaignStatus,
  data: number[],                // 32 bytes raw data
```

The `CampaignStatus` and `OrderType` are same as the origin.
<br/><br/>

### Influencer Info

PDA to represent each influencer's rating & boost info. Refer to the layout from the `sdk/accounts/influencerInfo.ts`.

Involves the fields from [`_influencers`](https://github.com/CosmicWire/PoC-Cosmic-Identity/blob/6fa21ef16652eb7f1c3e1dc47defb5aa8a20d9b3/contract/Cosmic.sol#L68) and [`_activeBoost`](https://github.com/CosmicWire/PoC-Cosmic-Identity/blob/6fa21ef16652eb7f1c3e1dc47defb5aa8a20d9b3/contract/Boost.sol#L8).

```ts
  address: PublicKey, // influencer address
  postPrice: bigint,
  repostPrice: bigint,
  postPinPrice: bigint,

  boost: BoostInfo,
  rating: bigint, //sum points which influencer is receiving
```

<br/>

### Point State

PDA to represent influencers points by month. Refer to the layout from the `sdk/accounts/pointState.ts`.

Involves single array of [`Checkpoint`](https://github.com/CosmicWire/PoC-Cosmic-Identity/blob/6fa21ef16652eb7f1c3e1dc47defb5aa8a20d9b3/libraries/Checkpoints.sol#L14) for each influencer. <br/>

**Especially**, the `PointState` of `globalState` PDA represent the [`totalPointsByMonth`](https://github.com/CosmicWire/PoC-Cosmic-Identity/blob/6fa21ef16652eb7f1c3e1dc47defb5aa8a20d9b3/contract/CosmicRating.sol#L14) of the program.

```ts
  owner: PublicKey;
  pointsByMonth: Checkpoint[];
```

The `Checkpoint` has same structure with [Checkpoints](https://github.com/CosmicWire/PoC-Cosmic-Identity/blob/6fa21ef16652eb7f1c3e1dc47defb5aa8a20d9b3/libraries/Checkpoints.sol#L8)

```ts
monthId: bigint;
value: bigint;
```
