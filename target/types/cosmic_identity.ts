export type CosmicIdentity = {
  "version": "0.1.0",
  "name": "cosmic_identity",
  "instructions": [
    {
      "name": "initializeGlobalState",
      "docs": [
        "* Initializes a global state account.\n     * Deployer becomes the initial admin of global state."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programData",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferGlobalAdmin",
      "docs": [
        "* Transfer admin of global state to another address.\n     * Restricted to global admin.\n     *\n     * - `new_admin` - The new address for global admin."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setGlobalFees",
      "docs": [
        "* Set fee related thresholds for global config\n     * Restricted to global admin."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeNumerator",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "feeDenumerator",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "maxMintedValue",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "minFee",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "beginMintingMonth",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "minMintedValue",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "mintStep",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "setGlobalPeriods",
      "docs": [
        "* Set period thresholds for global config\n     * Restricted to global admin."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "releasePeriod",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "acceptPeriod",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "claimAfter",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "approvePeriod",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "addGlobalScales",
      "docs": [
        "* Add scales threshold for global config\n     * Restricted to global admin."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "scaleType",
          "type": {
            "defined": "ScaleType"
          }
        },
        {
          "name": "bound",
          "type": "u64"
        },
        {
          "name": "value",
          "type": "u64"
        }
      ]
    },
    {
      "name": "removeGlobalScales",
      "docs": [
        "* Remove scales threshold for global config\n     * Restricted to global admin."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "scaleType",
          "type": {
            "defined": "ScaleType"
          }
        },
        {
          "name": "index",
          "type": "u8"
        }
      ]
    },
    {
      "name": "setGlobalBoostMultiplier",
      "docs": [
        "* Set boost multipliers for global config\n     * Restricted to global admin."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "boostType",
          "type": {
            "defined": "BoostType"
          }
        },
        {
          "name": "numerator",
          "type": "u64"
        },
        {
          "name": "denumerator",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeInfluencer",
      "docs": [
        "* Initializes a influencer info PDA.\n     * Influencer has mint right."
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencerInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalPointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencerPointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setInfluencerBoost",
      "docs": [
        "* Set influencer boost config."
      ],
      "accounts": [
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "influencerInfo",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "boostType",
          "type": {
            "defined": "BoostType"
          }
        },
        {
          "name": "expiresAt",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancelInfluencerBoost",
      "docs": [
        "* Cancel influencer boost config."
      ],
      "accounts": [
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "influencerInfo",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "boostType",
          "type": {
            "defined": "BoostType"
          }
        },
        {
          "name": "expiresAt",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializePointState",
      "docs": [
        "* Initializes a point state info PDA."
      ],
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createOrder",
      "docs": [
        "* Creates order for ad campaign\n    * - caller: brand\n    * influencerID verified influencer's address\n    * orderType type of order (post, repost, post+pin)\n    * releaseDate plan date of ad integration (unix timestamp / 1000)\n    * data hash of off-chain order's data\n\n    * #### Special Errors\n    * `InvalidInfluencerAddress` - Influencer account not exist or does not match the address of account provided\n    * `InvalidReleaseDate` - Order release date should be future time\n    * `ZeroPrice` - Order price should not be zero"
      ],
      "accounts": [
        {
          "name": "brand",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencerInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "costTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "orderType",
          "type": {
            "defined": "OrderType"
          }
        },
        {
          "name": "releaseDate",
          "type": "u64"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "data",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "acceptOrder",
      "docs": [
        "* Accepts order\n     *  - caller: influencer\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "rejectOrder",
      "docs": [
        "* Rejects order if it's not refunded\n     *  - caller: influencer\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "costTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "brand",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimOrder",
      "docs": [
        "* Returns money to the brand if order is rejected or time is up\n     *  - caller: brand\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "brand",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "costTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "completeOrder",
      "docs": [
        "* Marks order as completed and accrues rating points\n     *  - caller: influencer\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimDelayedOrder",
      "docs": [
        "* Returns money to the brand if order is not completed in time\n     *  - caller: brand\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "brand",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "costTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "approveResult",
      "docs": [
        "* Aproves result of ad campaign\n     *  - caller: brand\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "brand",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "influencerInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalPointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencerPointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "costTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        },
        {
          "name": "score",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimAutoApprove",
      "docs": [
        "* Claims rewards for ad campaign\n     *  - caller: influencer\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencerInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalPointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencerPointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "costTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "rejectResult",
      "docs": [
        "* Reject Ad campaign\n     *  - caller: brand\n     * Admin can manage contract and send funds to influencer/business\n     *\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "brand",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "campaignState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "brand",
            "type": "publicKey"
          },
          {
            "name": "influencer",
            "type": "publicKey"
          },
          {
            "name": "releaseDate",
            "type": "u64"
          },
          {
            "name": "orderCreationTime",
            "type": "u64"
          },
          {
            "name": "orderCompletionTime",
            "type": "u64"
          },
          {
            "name": "orderType",
            "type": {
              "defined": "OrderType"
            }
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "fee",
            "type": "u64"
          },
          {
            "name": "rating",
            "type": "u64"
          },
          {
            "name": "status",
            "type": {
              "defined": "CampaignStatus"
            }
          },
          {
            "name": "data",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "globalState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "totalCampaignCount",
            "type": "u64"
          },
          {
            "name": "releasePeriodInSeconds",
            "type": "u64"
          },
          {
            "name": "acceptPeriodInSeconds",
            "type": "u64"
          },
          {
            "name": "claimAfterInSeconds",
            "type": "u64"
          },
          {
            "name": "approvePeriodInSeconds",
            "type": "u64"
          },
          {
            "name": "feeNumerator",
            "type": "u64"
          },
          {
            "name": "feeDenumerator",
            "type": "u64"
          },
          {
            "name": "maxMintedValue",
            "type": "u64"
          },
          {
            "name": "minFee",
            "type": "u64"
          },
          {
            "name": "beginMintingMonth",
            "type": "u64"
          },
          {
            "name": "minMintedValue",
            "type": "u64"
          },
          {
            "name": "mintStep",
            "type": "u64"
          },
          {
            "name": "acceptOrderTimeRewardCount",
            "type": "u8"
          },
          {
            "name": "acceptOrderTimeReward",
            "type": {
              "array": [
                {
                  "defined": "ScaleValue"
                },
                10
              ]
            }
          },
          {
            "name": "completeOrderTimeRewardCount",
            "type": "u8"
          },
          {
            "name": "completeOrderTimeReward",
            "type": {
              "array": [
                {
                  "defined": "ScaleValue"
                },
                10
              ]
            }
          },
          {
            "name": "approveResultsScoreRewardCount",
            "type": "u8"
          },
          {
            "name": "approveResultsScoreReward",
            "type": {
              "array": [
                {
                  "defined": "ScaleValue"
                },
                10
              ]
            }
          },
          {
            "name": "boostMultipliers",
            "type": {
              "array": [
                {
                  "defined": "Multiplier"
                },
                10
              ]
            }
          }
        ]
      }
    },
    {
      "name": "influencerInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "postPrice",
            "type": "u64"
          },
          {
            "name": "repostPrice",
            "type": "u64"
          },
          {
            "name": "postPinPrice",
            "type": "u64"
          },
          {
            "name": "rating",
            "type": "u64"
          },
          {
            "name": "boost",
            "type": {
              "defined": "BoostInfo"
            }
          }
        ]
      }
    },
    {
      "name": "pointState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "pointsByMonth",
            "type": {
              "vec": {
                "defined": "Checkpoint"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ScaleValue",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bound",
            "type": "u64"
          },
          {
            "name": "value",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Multiplier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "numerator",
            "type": "u64"
          },
          {
            "name": "denumerator",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "BoostInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "boostType",
            "type": {
              "defined": "BoostType"
            }
          },
          {
            "name": "expiresAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Checkpoint",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "monthId",
            "type": "u64"
          },
          {
            "name": "value",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "CampaignStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "NotExist"
          },
          {
            "name": "OrderCreated"
          },
          {
            "name": "OrderAccepted"
          },
          {
            "name": "OrderRejected"
          },
          {
            "name": "OrderRefunded"
          },
          {
            "name": "OrderFilled"
          },
          {
            "name": "OrderDelayedRefunded"
          },
          {
            "name": "ResultAproved"
          },
          {
            "name": "ResultRejected"
          },
          {
            "name": "ResultAutoAproved"
          },
          {
            "name": "ResultRejectedAdmin"
          },
          {
            "name": "ResultAprovedAdmin"
          }
        ]
      }
    },
    {
      "name": "OrderType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Post"
          },
          {
            "name": "Repost"
          },
          {
            "name": "PostPin"
          }
        ]
      }
    },
    {
      "name": "ScaleType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AcceptOrder"
          },
          {
            "name": "CompleteOrder"
          },
          {
            "name": "ApproveResults"
          }
        ]
      }
    },
    {
      "name": "BoostType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Type0"
          },
          {
            "name": "Type1"
          },
          {
            "name": "Type2"
          },
          {
            "name": "Type3"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "OrderCreated",
      "fields": [
        {
          "name": "campaignId",
          "type": "u64",
          "index": false
        },
        {
          "name": "brand",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "influencer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "releaseDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderCreationTime",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderCompletionTime",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderType",
          "type": {
            "defined": "OrderType"
          },
          "index": false
        },
        {
          "name": "price",
          "type": "u64",
          "index": false
        },
        {
          "name": "fee",
          "type": "u64",
          "index": false
        },
        {
          "name": "rating",
          "type": "u64",
          "index": false
        },
        {
          "name": "status",
          "type": {
            "defined": "CampaignStatus"
          },
          "index": false
        },
        {
          "name": "data",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        }
      ]
    },
    {
      "name": "OrderUpdated",
      "fields": [
        {
          "name": "campaignId",
          "type": "u64",
          "index": false
        },
        {
          "name": "rating",
          "type": "u64",
          "index": false
        },
        {
          "name": "status",
          "type": {
            "defined": "CampaignStatus"
          },
          "index": false
        },
        {
          "name": "orderCompletionTime",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidGlobalAdmin",
      "msg": "Global state admin does not match the address of account provided"
    },
    {
      "code": 6001,
      "name": "InvalidDeployer",
      "msg": "Global state initializer does not match the deployer of program"
    },
    {
      "code": 6002,
      "name": "InvalidProgramDataAccount",
      "msg": "Invalid ProgramData account"
    },
    {
      "code": 6003,
      "name": "ZeroFeeDenumerator",
      "msg": "Global fee denumerator should not zero"
    },
    {
      "code": 6004,
      "name": "InvalidInfluencerAddress",
      "msg": "Influencer info owner does not match the address of account provided"
    },
    {
      "code": 6005,
      "name": "InvalidReleaseDate",
      "msg": "Campaign release date should future time"
    },
    {
      "code": 6006,
      "name": "ZeroPrice",
      "msg": "Campaign Price should not zero"
    },
    {
      "code": 6007,
      "name": "TooManyScaleItems",
      "msg": "Not able to add more than 10 scale items"
    },
    {
      "code": 6008,
      "name": "InvalidScaleIndex",
      "msg": "Over range of scale items index"
    },
    {
      "code": 6009,
      "name": "InvalidCampaignId",
      "msg": "Campaign id does not match with provided id"
    },
    {
      "code": 6010,
      "name": "CampaignInfluencerMismatch",
      "msg": "Campaign influencer does not match with provided influencer address"
    },
    {
      "code": 6011,
      "name": "NotOrderCreatedStatus",
      "msg": "Campaign status is not order created status"
    },
    {
      "code": 6012,
      "name": "CampaignBrandMismatch",
      "msg": "Campaign brand does not match with provided brand address"
    },
    {
      "code": 6013,
      "name": "InvalidClaimTime",
      "msg": "Campaign claim not able yet"
    },
    {
      "code": 6014,
      "name": "InvalidCampaignStatus",
      "msg": "Campaign status value is invalid for this case"
    },
    {
      "code": 6015,
      "name": "NotOrderAcceptedStatus",
      "msg": "Campaign status is not order accepted status"
    },
    {
      "code": 6016,
      "name": "InvalidCompleteTime",
      "msg": "Campaign complete not able yet"
    },
    {
      "code": 6017,
      "name": "InvalidScoreValue",
      "msg": "Campaign approve score value is invalid"
    },
    {
      "code": 6018,
      "name": "AlreadyBoosted",
      "msg": "Influencer already have valid boosting config"
    },
    {
      "code": 6019,
      "name": "AlreadyInvalidBoost",
      "msg": "Influencer boosting not configured or already expired config"
    },
    {
      "code": 6020,
      "name": "InvalidPointStateOwner",
      "msg": "Owner address of point state not match with provided account address"
    },
    {
      "code": 6021,
      "name": "InvalidAutoApproveTime",
      "msg": "Campaign claim auto approve not able yet"
    }
  ]
};

export const IDL: CosmicIdentity = {
  "version": "0.1.0",
  "name": "cosmic_identity",
  "instructions": [
    {
      "name": "initializeGlobalState",
      "docs": [
        "* Initializes a global state account.\n     * Deployer becomes the initial admin of global state."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programData",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferGlobalAdmin",
      "docs": [
        "* Transfer admin of global state to another address.\n     * Restricted to global admin.\n     *\n     * - `new_admin` - The new address for global admin."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "setGlobalFees",
      "docs": [
        "* Set fee related thresholds for global config\n     * Restricted to global admin."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeNumerator",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "feeDenumerator",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "maxMintedValue",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "minFee",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "beginMintingMonth",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "minMintedValue",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "mintStep",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "setGlobalPeriods",
      "docs": [
        "* Set period thresholds for global config\n     * Restricted to global admin."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "releasePeriod",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "acceptPeriod",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "claimAfter",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "approvePeriod",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "addGlobalScales",
      "docs": [
        "* Add scales threshold for global config\n     * Restricted to global admin."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "scaleType",
          "type": {
            "defined": "ScaleType"
          }
        },
        {
          "name": "bound",
          "type": "u64"
        },
        {
          "name": "value",
          "type": "u64"
        }
      ]
    },
    {
      "name": "removeGlobalScales",
      "docs": [
        "* Remove scales threshold for global config\n     * Restricted to global admin."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "scaleType",
          "type": {
            "defined": "ScaleType"
          }
        },
        {
          "name": "index",
          "type": "u8"
        }
      ]
    },
    {
      "name": "setGlobalBoostMultiplier",
      "docs": [
        "* Set boost multipliers for global config\n     * Restricted to global admin."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "boostType",
          "type": {
            "defined": "BoostType"
          }
        },
        {
          "name": "numerator",
          "type": "u64"
        },
        {
          "name": "denumerator",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeInfluencer",
      "docs": [
        "* Initializes a influencer info PDA.\n     * Influencer has mint right."
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencerInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalPointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencerPointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setInfluencerBoost",
      "docs": [
        "* Set influencer boost config."
      ],
      "accounts": [
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "influencerInfo",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "boostType",
          "type": {
            "defined": "BoostType"
          }
        },
        {
          "name": "expiresAt",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancelInfluencerBoost",
      "docs": [
        "* Cancel influencer boost config."
      ],
      "accounts": [
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "influencerInfo",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "boostType",
          "type": {
            "defined": "BoostType"
          }
        },
        {
          "name": "expiresAt",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializePointState",
      "docs": [
        "* Initializes a point state info PDA."
      ],
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createOrder",
      "docs": [
        "* Creates order for ad campaign\n    * - caller: brand\n    * influencerID verified influencer's address\n    * orderType type of order (post, repost, post+pin)\n    * releaseDate plan date of ad integration (unix timestamp / 1000)\n    * data hash of off-chain order's data\n\n    * #### Special Errors\n    * `InvalidInfluencerAddress` - Influencer account not exist or does not match the address of account provided\n    * `InvalidReleaseDate` - Order release date should be future time\n    * `ZeroPrice` - Order price should not be zero"
      ],
      "accounts": [
        {
          "name": "brand",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencerInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "costTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "orderType",
          "type": {
            "defined": "OrderType"
          }
        },
        {
          "name": "releaseDate",
          "type": "u64"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "data",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "acceptOrder",
      "docs": [
        "* Accepts order\n     *  - caller: influencer\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "rejectOrder",
      "docs": [
        "* Rejects order if it's not refunded\n     *  - caller: influencer\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "costTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "brand",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimOrder",
      "docs": [
        "* Returns money to the brand if order is rejected or time is up\n     *  - caller: brand\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "brand",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "costTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "completeOrder",
      "docs": [
        "* Marks order as completed and accrues rating points\n     *  - caller: influencer\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimDelayedOrder",
      "docs": [
        "* Returns money to the brand if order is not completed in time\n     *  - caller: brand\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "brand",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "costTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "approveResult",
      "docs": [
        "* Aproves result of ad campaign\n     *  - caller: brand\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "brand",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "influencerInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalPointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencerPointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "costTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        },
        {
          "name": "score",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimAutoApprove",
      "docs": [
        "* Claims rewards for ad campaign\n     *  - caller: influencer\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "influencer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencerInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalPointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "influencerPointInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "costTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "rejectResult",
      "docs": [
        "* Reject Ad campaign\n     *  - caller: brand\n     * Admin can manage contract and send funds to influencer/business\n     *\n     * campaignID id of the campaign"
      ],
      "accounts": [
        {
          "name": "brand",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "campaignState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "campaignId",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "campaignState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "brand",
            "type": "publicKey"
          },
          {
            "name": "influencer",
            "type": "publicKey"
          },
          {
            "name": "releaseDate",
            "type": "u64"
          },
          {
            "name": "orderCreationTime",
            "type": "u64"
          },
          {
            "name": "orderCompletionTime",
            "type": "u64"
          },
          {
            "name": "orderType",
            "type": {
              "defined": "OrderType"
            }
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "fee",
            "type": "u64"
          },
          {
            "name": "rating",
            "type": "u64"
          },
          {
            "name": "status",
            "type": {
              "defined": "CampaignStatus"
            }
          },
          {
            "name": "data",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "globalState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "totalCampaignCount",
            "type": "u64"
          },
          {
            "name": "releasePeriodInSeconds",
            "type": "u64"
          },
          {
            "name": "acceptPeriodInSeconds",
            "type": "u64"
          },
          {
            "name": "claimAfterInSeconds",
            "type": "u64"
          },
          {
            "name": "approvePeriodInSeconds",
            "type": "u64"
          },
          {
            "name": "feeNumerator",
            "type": "u64"
          },
          {
            "name": "feeDenumerator",
            "type": "u64"
          },
          {
            "name": "maxMintedValue",
            "type": "u64"
          },
          {
            "name": "minFee",
            "type": "u64"
          },
          {
            "name": "beginMintingMonth",
            "type": "u64"
          },
          {
            "name": "minMintedValue",
            "type": "u64"
          },
          {
            "name": "mintStep",
            "type": "u64"
          },
          {
            "name": "acceptOrderTimeRewardCount",
            "type": "u8"
          },
          {
            "name": "acceptOrderTimeReward",
            "type": {
              "array": [
                {
                  "defined": "ScaleValue"
                },
                10
              ]
            }
          },
          {
            "name": "completeOrderTimeRewardCount",
            "type": "u8"
          },
          {
            "name": "completeOrderTimeReward",
            "type": {
              "array": [
                {
                  "defined": "ScaleValue"
                },
                10
              ]
            }
          },
          {
            "name": "approveResultsScoreRewardCount",
            "type": "u8"
          },
          {
            "name": "approveResultsScoreReward",
            "type": {
              "array": [
                {
                  "defined": "ScaleValue"
                },
                10
              ]
            }
          },
          {
            "name": "boostMultipliers",
            "type": {
              "array": [
                {
                  "defined": "Multiplier"
                },
                10
              ]
            }
          }
        ]
      }
    },
    {
      "name": "influencerInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "postPrice",
            "type": "u64"
          },
          {
            "name": "repostPrice",
            "type": "u64"
          },
          {
            "name": "postPinPrice",
            "type": "u64"
          },
          {
            "name": "rating",
            "type": "u64"
          },
          {
            "name": "boost",
            "type": {
              "defined": "BoostInfo"
            }
          }
        ]
      }
    },
    {
      "name": "pointState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "pointsByMonth",
            "type": {
              "vec": {
                "defined": "Checkpoint"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ScaleValue",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bound",
            "type": "u64"
          },
          {
            "name": "value",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Multiplier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "numerator",
            "type": "u64"
          },
          {
            "name": "denumerator",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "BoostInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "boostType",
            "type": {
              "defined": "BoostType"
            }
          },
          {
            "name": "expiresAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Checkpoint",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "monthId",
            "type": "u64"
          },
          {
            "name": "value",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "CampaignStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "NotExist"
          },
          {
            "name": "OrderCreated"
          },
          {
            "name": "OrderAccepted"
          },
          {
            "name": "OrderRejected"
          },
          {
            "name": "OrderRefunded"
          },
          {
            "name": "OrderFilled"
          },
          {
            "name": "OrderDelayedRefunded"
          },
          {
            "name": "ResultAproved"
          },
          {
            "name": "ResultRejected"
          },
          {
            "name": "ResultAutoAproved"
          },
          {
            "name": "ResultRejectedAdmin"
          },
          {
            "name": "ResultAprovedAdmin"
          }
        ]
      }
    },
    {
      "name": "OrderType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Post"
          },
          {
            "name": "Repost"
          },
          {
            "name": "PostPin"
          }
        ]
      }
    },
    {
      "name": "ScaleType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AcceptOrder"
          },
          {
            "name": "CompleteOrder"
          },
          {
            "name": "ApproveResults"
          }
        ]
      }
    },
    {
      "name": "BoostType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Type0"
          },
          {
            "name": "Type1"
          },
          {
            "name": "Type2"
          },
          {
            "name": "Type3"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "OrderCreated",
      "fields": [
        {
          "name": "campaignId",
          "type": "u64",
          "index": false
        },
        {
          "name": "brand",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "influencer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "releaseDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderCreationTime",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderCompletionTime",
          "type": "u64",
          "index": false
        },
        {
          "name": "orderType",
          "type": {
            "defined": "OrderType"
          },
          "index": false
        },
        {
          "name": "price",
          "type": "u64",
          "index": false
        },
        {
          "name": "fee",
          "type": "u64",
          "index": false
        },
        {
          "name": "rating",
          "type": "u64",
          "index": false
        },
        {
          "name": "status",
          "type": {
            "defined": "CampaignStatus"
          },
          "index": false
        },
        {
          "name": "data",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        }
      ]
    },
    {
      "name": "OrderUpdated",
      "fields": [
        {
          "name": "campaignId",
          "type": "u64",
          "index": false
        },
        {
          "name": "rating",
          "type": "u64",
          "index": false
        },
        {
          "name": "status",
          "type": {
            "defined": "CampaignStatus"
          },
          "index": false
        },
        {
          "name": "orderCompletionTime",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidGlobalAdmin",
      "msg": "Global state admin does not match the address of account provided"
    },
    {
      "code": 6001,
      "name": "InvalidDeployer",
      "msg": "Global state initializer does not match the deployer of program"
    },
    {
      "code": 6002,
      "name": "InvalidProgramDataAccount",
      "msg": "Invalid ProgramData account"
    },
    {
      "code": 6003,
      "name": "ZeroFeeDenumerator",
      "msg": "Global fee denumerator should not zero"
    },
    {
      "code": 6004,
      "name": "InvalidInfluencerAddress",
      "msg": "Influencer info owner does not match the address of account provided"
    },
    {
      "code": 6005,
      "name": "InvalidReleaseDate",
      "msg": "Campaign release date should future time"
    },
    {
      "code": 6006,
      "name": "ZeroPrice",
      "msg": "Campaign Price should not zero"
    },
    {
      "code": 6007,
      "name": "TooManyScaleItems",
      "msg": "Not able to add more than 10 scale items"
    },
    {
      "code": 6008,
      "name": "InvalidScaleIndex",
      "msg": "Over range of scale items index"
    },
    {
      "code": 6009,
      "name": "InvalidCampaignId",
      "msg": "Campaign id does not match with provided id"
    },
    {
      "code": 6010,
      "name": "CampaignInfluencerMismatch",
      "msg": "Campaign influencer does not match with provided influencer address"
    },
    {
      "code": 6011,
      "name": "NotOrderCreatedStatus",
      "msg": "Campaign status is not order created status"
    },
    {
      "code": 6012,
      "name": "CampaignBrandMismatch",
      "msg": "Campaign brand does not match with provided brand address"
    },
    {
      "code": 6013,
      "name": "InvalidClaimTime",
      "msg": "Campaign claim not able yet"
    },
    {
      "code": 6014,
      "name": "InvalidCampaignStatus",
      "msg": "Campaign status value is invalid for this case"
    },
    {
      "code": 6015,
      "name": "NotOrderAcceptedStatus",
      "msg": "Campaign status is not order accepted status"
    },
    {
      "code": 6016,
      "name": "InvalidCompleteTime",
      "msg": "Campaign complete not able yet"
    },
    {
      "code": 6017,
      "name": "InvalidScoreValue",
      "msg": "Campaign approve score value is invalid"
    },
    {
      "code": 6018,
      "name": "AlreadyBoosted",
      "msg": "Influencer already have valid boosting config"
    },
    {
      "code": 6019,
      "name": "AlreadyInvalidBoost",
      "msg": "Influencer boosting not configured or already expired config"
    },
    {
      "code": 6020,
      "name": "InvalidPointStateOwner",
      "msg": "Owner address of point state not match with provided account address"
    },
    {
      "code": 6021,
      "name": "InvalidAutoApproveTime",
      "msg": "Campaign claim auto approve not able yet"
    }
  ]
};