export const TezosTransferTokenEventContract = {
    abi: {
        "ABI version": 2,
        "version": "2.1",
        "header": ["pubkey", "time", "expire"],
        "functions": [{
            "name": "constructor",
            "inputs": [{"name": "_initializer", "type": "address"}],
            "outputs": []
        }, {
            "name": "getEventInitData",
            "inputs": [{"name": "answerId", "type": "uint32"}],
            "outputs": [{
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
                }, {"name": "bridge", "type": "address"}], "name": "value0", "type": "tuple"
            }]
        }, {
            "name": "confirm",
            "inputs": [{"name": "voteReceiver", "type": "address"}],
            "outputs": []
        }, {
            "name": "reject",
            "inputs": [{"name": "voteReceiver", "type": "address"}],
            "outputs": []
        }, {
            "name": "getDetails",
            "inputs": [{"name": "answerId", "type": "uint32"}],
            "outputs": [{
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
                }, {"name": "bridge", "type": "address"}], "name": "_eventInitData", "type": "tuple"
            }, {"name": "_status", "type": "uint8"}, {
                "name": "_confirms",
                "type": "uint256[]"
            }, {"name": "_rejects", "type": "uint256[]"}, {
                "name": "empty",
                "type": "uint256[]"
            }, {"name": "balance", "type": "uint128"}, {
                "name": "_initializer",
                "type": "address"
            }, {"name": "_requiredVotes", "type": "uint32"}]
        }, {
            "name": "receiveRelayKeys",
            "inputs": [{"name": "keys", "type": "uint256[]"}],
            "outputs": []
        }, {
            "name": "getVoters",
            "inputs": [{"name": "answerId", "type": "uint32"}, {"name": "vote", "type": "uint8"}],
            "outputs": [{"name": "voters", "type": "uint256[]"}]
        }, {
            "name": "getVote",
            "inputs": [{"name": "answerId", "type": "uint32"}, {"name": "voter", "type": "uint256"}],
            "outputs": [{"name": "vote", "type": "optional(uint8)"}]
        }, {"name": "status", "inputs": [], "outputs": [{"name": "status", "type": "uint8"}]}, {
            "name": "votes",
            "inputs": [],
            "outputs": [{"name": "votes", "type": "map(uint256,uint8)"}]
        }, {
            "name": "initializer",
            "inputs": [],
            "outputs": [{"name": "initializer", "type": "address"}]
        }, {
            "name": "requiredVotes",
            "inputs": [],
            "outputs": [{"name": "requiredVotes", "type": "uint32"}]
        }, {
            "name": "confirms",
            "inputs": [],
            "outputs": [{"name": "confirms", "type": "uint16"}]
        }, {"name": "rejects", "inputs": [], "outputs": [{"name": "rejects", "type": "uint16"}]}],
        "data": [{
            "components": [{
                "components": [{"name": "eventID", "type": "uint32"}, {
                    "name": "eventBlockHash",
                    "type": "bytes"
                }, {"name": "eventData", "type": "cell"}, {"name": "eventTransactionHash", "type": "bytes"}],
                "name": "voteData",
                "type": "tuple"
            }, {"name": "configuration", "type": "address"}, {
                "name": "chainId",
                "type": "uint32"
            }, {"name": "bridge", "type": "address"}], "key": 1, "name": "eventInitData", "type": "tuple"
        }],
        "events": [{
            "name": "Confirm",
            "inputs": [{"name": "relay", "type": "uint256"}],
            "outputs": []
        }, {"name": "Reject", "inputs": [{"name": "relay", "type": "uint256"}], "outputs": []}, {
            "name": "Closed",
            "inputs": [],
            "outputs": []
        }],
        "fields": [{"name": "_pubkey", "type": "uint256"}, {
            "name": "_timestamp",
            "type": "uint64"
        }, {"name": "_constructorFlag", "type": "bool"}, {"name": "status", "type": "uint8"}, {
            "name": "votes",
            "type": "map(uint256,uint8)"
        }, {"name": "initializer", "type": "address"}, {
            "name": "requiredVotes",
            "type": "uint32"
        }, {"name": "confirms", "type": "uint16"}, {
            "name": "rejects",
            "type": "uint16"
        }, {
            "components": [{
                "components": [{"name": "eventID", "type": "uint32"}, {
                    "name": "eventBlockHash",
                    "type": "bytes"
                }, {"name": "eventData", "type": "cell"}, {"name": "eventTransactionHash", "type": "bytes"}],
                "name": "voteData",
                "type": "tuple"
            }, {"name": "configuration", "type": "address"}, {
                "name": "chainId",
                "type": "uint32"
            }, {"name": "bridge", "type": "address"}], "name": "eventInitData", "type": "tuple"
        }]
    },
    tvc: "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",
    code: "te6ccgECOgEACuAABCSK7VMg4wMgwP/jAiDA/uMC8gs3BAE5AQACAvztRNDXScMB+GaNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT4aSHbPNMAAY4dgQIA1xgg+QEB0wABlNP/AwGTAvhC4iD4ZfkQ8qiV0wAB8nri0z8B+EMhufK0IPgjgQPoqIIIG3dAoLnytPhj0x8B+CO88rkWAwEU0x8B2zz4R27yfAUDgO1E0NdJwwH4ZiLQ0wP6QDD4aak4APhEf29xggiYloBvcm1vc3BvdPhk3CHHAOMCIdcNH/K8IeMDAds8+Edu8nw2NgUEUCCCECauWM674wIgghA/dkjUu+MCIIIQS7GAyrvjAiCCEHmKvWi74wIrHA4GAiggghBtwZJzuuMCIIIQeYq9aLrjAgwHAzgw+Eby4Ez4Qm7jAPpBldTR0PpA39HbPNs8f/hnNQgzARb4SsAB8uBkjoDYMAkDpiDbPPhFIG6SMHDeINs8+AAg+EtxyMsHWYEBAPRD+Gv4TqS1D/huII0EcAAAAAAAAAAAAAAAAAGsAaZgyM7L/8lw+wD4SsMBkTDg+E74Tb6OgN4wJSQKAQpy+GrbPAsAmPhM+FD4UG8RyM+FiM6NBE5iWgAAAAAAAAAAAAAAAAAAwM8WWcjPkFMprYIBbyReMAFvJF4wyx/MzMzOyx9ZyM4ByM7Nzc3JgQCA+wADNjD4RvLgTPhCbuMA0x/0BFlvAgHR2zzbPH/4ZzUNMwGe+EnbPMcF8uBk+Ery0GQgbxCnAnOpBLUPpLUP+G0gbxFwbY4RUxKAIPQOb6GT1wv/3iAybrOOEiD4S3DIywdZgQEA9EP4ayGkMuhfBHH4ahUEUCCCEEcSx4m64wIgghBHVlTcuuMCIIIQSUtHXLrjAiCCEEuxgMq64wIbExIPA5ww+Eby4Ez4Qm7jANMf+ERYb3X4ZNHbPCGONCPQ0wH6QDAxyM+HIM5xzwthAcjPky7GAyoBbyReMAFvJF4wyx/MzMzOyx8ByM7Nzclw+wA1ERABoI5I+EQgbxMhbxL4SVUCbxHIcs9AygBzz0DOAfoC9ABxzwtpAcj4RG8VzwsfAW8kXjABbyReMMsfzMzMzssfAcjOzc3J+ERvFPsA4uMAf/hnMwAa+ERwb3KAQG90+GT4UAFSMNHbPPhNIY4cjQRwAAAAAAAAAAAAAAAAMlLR1yDIzssfyXD7AN5/+Gc1BGIw+EJu4wD4RvJz+kGV1NHQ+kDf0YEJCfhQbxH4SccF8vRw+Gog+GzbPNs8MNs8f/hnFjkUMwFU2zzIz4WIzo0GkO5rKAAAAAAAAAAAAAAAAAAAEObgRLbgyTnAzxbJcPsAFQAI+FBvEwIW7UTQ10nCAYqOgOI1FwKscO1E0PQFcPhqbfhrjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE+Gxw+G1w+G5w+G9xIYBA9A+OgI6A4vhwgED0DvK91wv/+GJw+GMZGAOicIiIiG8EjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEcI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABG8EOTk5AQbQ2zwaADTTH9TU1FUwbwQB+kDTH/pBldTR0PpA39FvBAFSMNHbPPhKIY4cjQRwAAAAAAAAAAAAAAAAMcSx4mDIzssHyXD7AN5/+Gc1BFAgghAp3HGNuuMCIIIQPBqgNLrjAiCCED51Sr+64wIgghA/dkjUuuMCJyYeHQFQMNHbPPhMIY4bjQRwAAAAAAAAAAAAAAAAL92SNSDIzs7JcPsA3n/4ZzUDODD4RvLgTPhCbuMA+kGV1NHQ+kDf0ds82zx/+Gc1HzMBFvhKwAHy4GSOgNgwIAOmINs8+EUgbpIwcN4g2zz4ACD4S3LIywdZgQEA9EP4a/hPpLUP+G8gjQRwAAAAAAAAAAAAAAAACj2dkWDIzsv/yXD7APhKwwGRMOD4T/hNvo6A3jAlJCEBCnP4ats8IgEI+EzbPCMAHsjPhYjOgG/PQMmBAIH7AAAugQkOIfhLgQEA9A6T1wsHkXDiwADy9DAAFoEJEyH4KMcF8vQwAVIw0ds8+E8hjhyNBHAAAAAAAAAAAAAAAAAvBqgNIMjOyw/JcPsA3n/4ZzUD5DD4RvLgTPhCbuMA0x/4RFhvdfhk0ds8KI5YKtDTAfpAMDHIz4cgznHPC2FecMjPkqdxxjYBbyReMAFvJF4wyx/MzMzOyx9VcMjOywcBbyICyx/0AAFvIgLLH/QAAW8iAssf9ADLf1nIzssfzc3NyXD7ADUpKAHojmz4RCBvEyFvEvhJVQJvEchyz0DKAHPPQM4B+gL0AHHPC2lecMj4RG8VzwsfAW8kXjABbyReMMsfzMzMzssfVXDIzssHAW8iAssf9AABbyICyx/0AAFvIgLLH/QAy39ZyM7LH83Nzcn4RG8U+wDi4wB/+GczBL5wiIiIbwSNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARwjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEbwRwcG1vAnBtbwJwbW8CcDk5OSoDjo0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHD4RHBvcoBAb3T4ZPhQ+Epx2zxy2zxw2zz4J28Q+Ez4TWyINDQ0BFAgghAd+IVpuuMCIIIQIM2CmbrjAiCCECQDpXy64wIgghAmrljOuuMCMS4tLAFSMNHbPPhOIY4cjQRwAAAAAAAAAAAAAAAAKauWM6DIzssPyXD7AN5/+Gc1AVIw0ds8+EshjhyNBHAAAAAAAAAAAAAAAAApAOlfIMjO9ADJcPsA3n/4ZzUDsDD4RvLgTPhCbuMA0x/4RFhvdfhk1w3/ldTR0NP/39HbPCGONCPQ0wH6QDAxyM+HIM6NBAAAAAAAAAAAAAAAAAoM2CmYzxYBIG6TMM+BlQHPg8sH4slw+wA1MC8Bio49+EQgbxMhbxL4SVUCbxHIcs9AygBzz0DOAfoC9ACAas9A+ERvFc8LHwEgbpMwz4GVAc+DywfiyfhEbxT7AOLjAH/4ZzMAMvhEcG9ygEBvdPhk+EuBAQD0Dm+hk9cLB94DoDD4RvLgTPhCbuMA0x/4RFhvdfhk0wchwgLy0EnR2zwhji4j0NMB+kAwMcjPhyDOjQQAAAAAAAAAAAAAAAAJ34hWmM8WAW8iAssf9ADJcPsANTQyAX6ON/hEIG8TIW8S+ElVAm8RyHLPQMoAc89AzgH6AvQAgGrPQPhEbxXPCx8BbyICyx/0AMn4RG8U+wDi4wB/+GczAIL4UPhP+E74TfhM+Ev4SvhD+ELIy//LP8+Dywf0AM7LH8sPyw8BbyReMAFvJF4wyx/MzFUwyMzOyx8ByM7NzcntVACycG1vAvhLIIEBAPSGlSBY1wsHk21tbeKTIm6zji1TBbqOE1NByMv/AW8iIaRVIIAg9ENvAjXeUyOBAQD0fJUgWNcLB5NtbW3ibDPoXwT4RHBvcoBAb3T4ZDEAlO1E0NP/0z/TADHTByHCA/LQSfQE+kDTH9MP0w/TH9TU1NHQ1FUwbwQB+kDTH9TR0PpAVTBvBAHR+HD4b/hu+G34bPhr+Gr4Y/hiAAr4RvLgTAIK9KQg9KE5OAAUc29sIDAuNDguMAAA",
    codeHash: "bee6bb89dcc72e8186043faeb83d72329be53de7fe91ec71baae655e1f626d5b",

}
