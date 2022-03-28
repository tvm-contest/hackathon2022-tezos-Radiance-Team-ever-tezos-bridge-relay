export const TezosEventConfigurationContract = {
        abi: {
            "ABI version": 2,
            "version": "2.1",
            "header": ["time", "expire"],
            "functions": [{
                "name": "constructor",
                "inputs": [{"name": "owner", "type": "address"}, {
                    "components": [{
                        "name": "bridge",
                        "type": "address"
                    }, {"name": "eventABI", "type": "bytes"}, {
                        "name": "eventInitialBalance",
                        "type": "uint64"
                    }, {"name": "eventCode", "type": "cell"}], "name": "basicConfiguration", "type": "tuple"
                }, {
                    "components": [{"name": "chainId", "type": "uint32"}, {
                        "name": "eventEmitter",
                        "type": "uint160"
                    }, {"name": "eventBlocksToConfirm", "type": "uint16"}, {
                        "name": "proxy",
                        "type": "address"
                    }, {"name": "startBlockNumber", "type": "uint32"}, {"name": "endBlockNumber", "type": "uint32"}],
                    "name": "networkConfiguration",
                    "type": "tuple"
                }],
                "outputs": []
            }, {
                "name": "setConfiguration",
                "inputs": [{
                    "components": [{"name": "bridge", "type": "address"}, {
                        "name": "eventABI",
                        "type": "bytes"
                    }, {"name": "eventInitialBalance", "type": "uint64"}, {"name": "eventCode", "type": "cell"}],
                    "name": "basicConfiguration",
                    "type": "tuple"
                }, {
                    "components": [{"name": "chainId", "type": "uint32"}, {
                        "name": "eventEmitter",
                        "type": "uint160"
                    }, {"name": "eventBlocksToConfirm", "type": "uint16"}, {
                        "name": "proxy",
                        "type": "address"
                    }, {"name": "startBlockNumber", "type": "uint32"}, {"name": "endBlockNumber", "type": "uint32"}],
                    "name": "networkConfiguration",
                    "type": "tuple"
                }],
                "outputs": []
            }, {
                "name": "deployEvent",
                "inputs": [{
                    "components": [{"name": "eventID", "type": "uint32"}, {
                        "name": "eventBlockHash",
                        "type": "bytes"
                    }, {"name": "eventData", "type": "cell"}, {"name": "eventTransactionHash", "type": "bytes"}],
                    "name": "eventVoteData",
                    "type": "tuple"
                }],
                "outputs": []
            }, {
                "name": "deriveEventAddress",
                "inputs": [{"name": "answerId", "type": "uint32"}, {
                    "components": [{
                        "name": "eventID",
                        "type": "uint32"
                    }, {"name": "eventBlockHash", "type": "bytes"}, {
                        "name": "eventData",
                        "type": "cell"
                    }, {"name": "eventTransactionHash", "type": "bytes"}], "name": "eventVoteData", "type": "tuple"
                }],
                "outputs": [{"name": "eventContract", "type": "address"}]
            }, {
                "name": "getDetails",
                "inputs": [{"name": "answerId", "type": "uint32"}],
                "outputs": [{
                    "components": [{"name": "bridge", "type": "address"}, {
                        "name": "eventABI",
                        "type": "bytes"
                    }, {"name": "eventInitialBalance", "type": "uint64"}, {"name": "eventCode", "type": "cell"}],
                    "name": "basicConfiguration",
                    "type": "tuple"
                }, {
                    "components": [{"name": "chainId", "type": "uint32"}, {
                        "name": "eventEmitter",
                        "type": "uint160"
                    }, {"name": "eventBlocksToConfirm", "type": "uint16"}, {
                        "name": "proxy",
                        "type": "address"
                    }, {"name": "startBlockNumber", "type": "uint32"}, {"name": "endBlockNumber", "type": "uint32"}],
                    "name": "networkConfiguration",
                    "type": "tuple"
                }]
            }, {
                "name": "getType",
                "inputs": [{"name": "answerId", "type": "uint32"}],
                "outputs": [{"name": "_type", "type": "uint8"}]
            }, {
                "name": "eventConfirmedCallback",
                "inputs": [{
                    "components": [{
                        "components": [{
                            "name": "eventID",
                            "type": "uint32"
                        }, {"name": "eventBlockHash", "type": "bytes"}, {
                            "name": "eventData",
                            "type": "cell"
                        }, {"name": "eventTransactionHash", "type": "bytes"}], "name": "voteData", "type": "tuple"
                    }, {"name": "configuration", "type": "address"}, {
                        "name": "chainId",
                        "type": "uint32"
                    }, {"name": "bridge", "type": "address"}], "name": "eventInitData", "type": "tuple"
                }, {"name": "gasBackAddress", "type": "address"}],
                "outputs": []
            }, {
                "name": "_basicConfiguration",
                "inputs": [],
                "outputs": [{
                    "components": [{"name": "bridge", "type": "address"}, {
                        "name": "eventABI",
                        "type": "bytes"
                    }, {"name": "eventInitialBalance", "type": "uint64"}, {"name": "eventCode", "type": "cell"}],
                    "name": "_basicConfiguration",
                    "type": "tuple"
                }]
            }, {
                "name": "_networkConfiguration",
                "inputs": [],
                "outputs": [{
                    "components": [{"name": "chainId", "type": "uint32"}, {
                        "name": "eventEmitter",
                        "type": "uint160"
                    }, {"name": "eventBlocksToConfirm", "type": "uint16"}, {
                        "name": "proxy",
                        "type": "address"
                    }, {"name": "startBlockNumber", "type": "uint32"}, {"name": "endBlockNumber", "type": "uint32"}],
                    "name": "_networkConfiguration",
                    "type": "tuple"
                }]
            }],
            "data": [],
            "events": [{
                "name": "NewEventContract",
                "inputs": [{"name": "eventContract", "type": "address"}],
                "outputs": []
            }],
            "fields": [{"name": "_pubkey", "type": "uint256"}, {
                "name": "_timestamp",
                "type": "uint64"
            }, {"name": "_constructorFlag", "type": "bool"}, {
                "name": "_owner",
                "type": "address"
            }, {
                "components": [{"name": "bridge", "type": "address"}, {
                    "name": "eventABI",
                    "type": "bytes"
                }, {"name": "eventInitialBalance", "type": "uint64"}, {"name": "eventCode", "type": "cell"}],
                "name": "_basicConfiguration",
                "type": "tuple"
            }, {
                "components": [{"name": "chainId", "type": "uint32"}, {
                    "name": "eventEmitter",
                    "type": "uint160"
                }, {"name": "eventBlocksToConfirm", "type": "uint16"}, {
                    "name": "proxy",
                    "type": "address"
                }, {"name": "startBlockNumber", "type": "uint32"}, {"name": "endBlockNumber", "type": "uint32"}],
                "name": "_networkConfiguration",
                "type": "tuple"
            }]
        },
        tvc: "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",
        code: "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"
    }

