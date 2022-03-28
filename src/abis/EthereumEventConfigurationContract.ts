export const EthereumEventConfigurationContract = {
    abi: {
        "ABI version": 2,
        "version": "2.2",
        "header": [
            "time",
            "expire"
        ],
        "functions": [
            {
                "name": "constructor",
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "name": "_meta",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setMeta",
                "inputs": [
                    {
                        "name": "_meta",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setEndBlockNumber",
                "inputs": [
                    {
                        "name": "endBlockNumber",
                        "type": "uint32"
                    }
                ],
                "outputs": []
            },
            {
                "name": "deployEvent",
                "inputs": [
                    {
                        "components": [
                            {
                                "name": "eventTransaction",
                                "type": "uint256"
                            },
                            {
                                "name": "eventIndex",
                                "type": "uint32"
                            },
                            {
                                "name": "eventData",
                                "type": "cell"
                            },
                            {
                                "name": "eventBlockNumber",
                                "type": "uint32"
                            },
                            {
                                "name": "eventBlock",
                                "type": "uint256"
                            }
                        ],
                        "name": "eventVoteData",
                        "type": "tuple"
                    }
                ],
                "outputs": []
            },
            {
                "name": "deriveEventAddress",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "components": [
                            {
                                "name": "eventTransaction",
                                "type": "uint256"
                            },
                            {
                                "name": "eventIndex",
                                "type": "uint32"
                            },
                            {
                                "name": "eventData",
                                "type": "cell"
                            },
                            {
                                "name": "eventBlockNumber",
                                "type": "uint32"
                            },
                            {
                                "name": "eventBlock",
                                "type": "uint256"
                            }
                        ],
                        "name": "eventVoteData",
                        "type": "tuple"
                    }
                ],
                "outputs": [
                    {
                        "name": "eventContract",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getDetails",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "eventABI",
                                "type": "bytes"
                            },
                            {
                                "name": "staking",
                                "type": "address"
                            },
                            {
                                "name": "eventInitialBalance",
                                "type": "uint64"
                            },
                            {
                                "name": "eventCode",
                                "type": "cell"
                            }
                        ],
                        "name": "_basicConfiguration",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "name": "chainId",
                                "type": "uint32"
                            },
                            {
                                "name": "eventEmitter",
                                "type": "uint160"
                            },
                            {
                                "name": "eventBlocksToConfirm",
                                "type": "uint16"
                            },
                            {
                                "name": "proxy",
                                "type": "address"
                            },
                            {
                                "name": "startBlockNumber",
                                "type": "uint32"
                            },
                            {
                                "name": "endBlockNumber",
                                "type": "uint32"
                            }
                        ],
                        "name": "_networkConfiguration",
                        "type": "tuple"
                    },
                    {
                        "name": "_meta",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "getType",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "_type",
                        "type": "uint8"
                    }
                ]
            },
            {
                "name": "broxusBridgeCallback",
                "inputs": [
                    {
                        "components": [
                            {
                                "components": [
                                    {
                                        "name": "eventTransaction",
                                        "type": "uint256"
                                    },
                                    {
                                        "name": "eventIndex",
                                        "type": "uint32"
                                    },
                                    {
                                        "name": "eventData",
                                        "type": "cell"
                                    },
                                    {
                                        "name": "eventBlockNumber",
                                        "type": "uint32"
                                    },
                                    {
                                        "name": "eventBlock",
                                        "type": "uint256"
                                    }
                                ],
                                "name": "voteData",
                                "type": "tuple"
                            },
                            {
                                "name": "configuration",
                                "type": "address"
                            },
                            {
                                "name": "staking",
                                "type": "address"
                            },
                            {
                                "name": "chainId",
                                "type": "uint32"
                            }
                        ],
                        "name": "eventInitData",
                        "type": "tuple"
                    },
                    {
                        "name": "gasBackAddress",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "transferOwnership",
                "inputs": [
                    {
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "renounceOwnership",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "owner",
                "inputs": [],
                "outputs": [
                    {
                        "name": "owner",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "basicConfiguration",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "eventABI",
                                "type": "bytes"
                            },
                            {
                                "name": "staking",
                                "type": "address"
                            },
                            {
                                "name": "eventInitialBalance",
                                "type": "uint64"
                            },
                            {
                                "name": "eventCode",
                                "type": "cell"
                            }
                        ],
                        "name": "basicConfiguration",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "networkConfiguration",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "chainId",
                                "type": "uint32"
                            },
                            {
                                "name": "eventEmitter",
                                "type": "uint160"
                            },
                            {
                                "name": "eventBlocksToConfirm",
                                "type": "uint16"
                            },
                            {
                                "name": "proxy",
                                "type": "address"
                            },
                            {
                                "name": "startBlockNumber",
                                "type": "uint32"
                            },
                            {
                                "name": "endBlockNumber",
                                "type": "uint32"
                            }
                        ],
                        "name": "networkConfiguration",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "meta",
                "inputs": [],
                "outputs": [
                    {
                        "name": "meta",
                        "type": "cell"
                    }
                ]
            }
        ],
        "data": [
            {
                "components": [
                    {
                        "name": "eventABI",
                        "type": "bytes"
                    },
                    {
                        "name": "staking",
                        "type": "address"
                    },
                    {
                        "name": "eventInitialBalance",
                        "type": "uint64"
                    },
                    {
                        "name": "eventCode",
                        "type": "cell"
                    }
                ],
                "key": 1,
                "name": "basicConfiguration",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "name": "chainId",
                        "type": "uint32"
                    },
                    {
                        "name": "eventEmitter",
                        "type": "uint160"
                    },
                    {
                        "name": "eventBlocksToConfirm",
                        "type": "uint16"
                    },
                    {
                        "name": "proxy",
                        "type": "address"
                    },
                    {
                        "name": "startBlockNumber",
                        "type": "uint32"
                    },
                    {
                        "name": "endBlockNumber",
                        "type": "uint32"
                    }
                ],
                "key": 2,
                "name": "networkConfiguration",
                "type": "tuple"
            }
        ],
        "events": [
            {
                "name": "OwnershipTransferred",
                "inputs": [
                    {
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "NewEventContract",
                "inputs": [
                    {
                        "name": "eventContract",
                        "type": "address"
                    }
                ],
                "outputs": []
            }
        ],
        "fields": [
            {
                "name": "_pubkey",
                "type": "uint256"
            },
            {
                "name": "_timestamp",
                "type": "uint64"
            },
            {
                "name": "_constructorFlag",
                "type": "bool"
            },
            {
                "name": "owner",
                "type": "address"
            },
            {
                "components": [
                    {
                        "name": "eventABI",
                        "type": "bytes"
                    },
                    {
                        "name": "staking",
                        "type": "address"
                    },
                    {
                        "name": "eventInitialBalance",
                        "type": "uint64"
                    },
                    {
                        "name": "eventCode",
                        "type": "cell"
                    }
                ],
                "name": "basicConfiguration",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "name": "chainId",
                        "type": "uint32"
                    },
                    {
                        "name": "eventEmitter",
                        "type": "uint160"
                    },
                    {
                        "name": "eventBlocksToConfirm",
                        "type": "uint16"
                    },
                    {
                        "name": "proxy",
                        "type": "address"
                    },
                    {
                        "name": "startBlockNumber",
                        "type": "uint32"
                    },
                    {
                        "name": "endBlockNumber",
                        "type": "uint32"
                    }
                ],
                "name": "networkConfiguration",
                "type": "tuple"
            },
            {
                "name": "meta",
                "type": "cell"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "1f80477c71c519072845e0fa26daba2f292dec0a85ef8c15414845d5d33d1eea",
};
