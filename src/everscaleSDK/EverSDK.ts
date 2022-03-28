import {abiContract, signerNone} from "@tonclient/core";
import {TezosEventConfigurationContract} from "../abis/TezosEventConfiguration";
//     {
//     public: '502c7fbba83f92c0753242810a4a04949ed8051dfdb88e8342a56c0fae42636e',
//     secret: '01309e67bc99fc19154a28682690fa5fe3cfccd35e754f5d3ce19db329b780da'
// }
import {TransferTokenProxyContract} from "../abis/TransferTokenProxy";
import {proxy} from "../../keys/TransferTokenProxy";
import {TECF} from "../../keys/TezosEventConfiguration";
import {TezosTransferTokenEventContract} from "../abis/TezosTransferTokenEvent";
import {relayKeysForConfirm} from "../../keys/relayKeys";
import {MsigContract} from "../abis/MSIG";

const {libNode} = require("@tonclient/lib-node");
const {Account} = require("@tonclient/appkit");
const {ResponseType} = require("@tonclient/core/dist/bin");
const {
    signerKeys,
    TonClient,
} = require("@tonclient/core");
TonClient.useBinaryLibrary(libNode);
const DappServer = "net.ton.dev"
const client = new TonClient({network: {endpoints: [DappServer]}});
const ACCOUNT_TYPE_ACTIVE = 1;
const ACCOUNT_TYPE_UNINITIALIZED = 0;

import {token_transfer} from '../tezosSDK/token-withdraw'
import {TokenWalletContract} from "../abis/TokenWallet";
import {TokenRootContract} from "../abis/TokenRoot";
import {TokenRoot} from "../../keys/TokenRoot";
import {TezosWalletAddress} from "../mocks";
import {signMsg} from "../tezosSDK/make-sig";
import {saveToDB, updateEventDB} from "../db/mongoDB";
import {EverscaleTransferTokenEventContract} from "../abis/EverscaleTransferTokenEvent";

function hashToNum(hash) {
    return hash.split('').map(i => i.charCodeAt(0)).reduce((a, b) => a + b, 0) % 10

}
const EVERSCALE_EVENT = "everscaleEvent"
const EVENT_STATUS_CONFIRMED = "CONFIRMED"
const hex = require('ascii-hex');

function toHex(input) {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        output += hex(input[i]).toString(16)
    }
    return String(output);
}

export async function getEvents(){
    let everHash = EverscaleTransferTokenEventContract.codeHash;
    let tezosHash = TezosTransferTokenEventContract.codeHash;

    const everHashArr = await getAllEvents(everHash)
    const tezosHashArr = await getAllEvents(tezosHash)

    console.log("everHashArr",everHashArr.length)
    console.log("tezosHashArr",tezosHashArr.length)

    tezosHashArr.map(async event=>{
        const everEventAcc = new Account(TezosTransferTokenEventContract, {
            address: event.id,
            signer: signerNone(),
            client
        });

        // let ConfirmsRes = await everEventAcc.runLocal("confirms", {});
        // const confirms = ConfirmsRes.decoded.output.confirms;

        let getDetailsRes = await everEventAcc.runLocal("getDetails", {answerId:0});
        const details = getDetailsRes.decoded.output;
        console.log("details",details)

        // let RejectsRes = await everEventAcc.runLocal("rejects", {});
        // const rejects = RejectsRes.decoded.output.rejects;

        // console.log("rejects",rejects)

    })
}


export async function getAllEvents(hash) {

    // let everHash = EverscaleTransferTokenEventContract.codeHash;
    // let tezosHash = TezosTransferTokenEventContract.codeHash;
    // hash = hash.substring(2, hash.length);

    let data = [];
    let dataPortion = [];

        do {
            const last = dataPortion.length
                ? dataPortion[dataPortion.length - 1].last_trans_lt
                : "";

            dataPortion = (
                await client.net.query_collection({
                    collection: "accounts",
                    filter: {
                        code_hash: {eq: hash},
                        last_trans_lt: {gt: last},
                    },
                    result: "id last_trans_lt",
                    limit: 25,
                })
            ).result;

            console.log("dataPortion", dataPortion);
            data.push(...dataPortion);
        } while (dataPortion.length);
        console.log("data",data,data.length)
    return data


    // const orders: Omit<LimitOrder, "pair" | "amountRaw" | "priceRaw">[] = [];
    // const processing: Promise<void>[] = [];
    //
    // data = uniqBy(data, "id");
    //
    // data.forEach(({id}) => {
    //     processing.push(
    //         new Promise<void>(async (resolve) => {
    //             const orderAcc = new Account(LimitOrderContract, {
    //                 address: id,
    //                 client: this.tonClient,
    //             });
    //
    //             const res = await orderAcc.runLocal("getInfo", {});
    //             if (!res.decoded) throw new Error(RUN_LOCAL_FAIL);
    //
    //             const limitOrderRaw = res.decoded.output as LimitOrderRaw;
    //             const limitOrder = TonService.parseLimitOrder({
    //                 ...limitOrderRaw,
    //                 addrOrder: id,
    //             });
    //             orders.push(limitOrder);
    //
    //             resolve();
    //         }),
    //     );
    // });
    //
    // await Promise.all(processing);
    // log("limitOrders", orders);
    //
    // return orders;
}

export async function getAccType(eventAddress) {
    try {
        const acc = new Account(TezosTransferTokenEventContract, {
            address: eventAddress,
            signer: signerNone(),
            client
        });

        let info;
        try {
            info = await acc.getAccount();
        } catch (error) {
            console.log(`Account with address ${eventAddress} isn't exist`)
            return {status: 0, error: error}
        }
        return {status: info.acc_type}
    } catch (error) {
        return error
    }
}

const walletAddrMsig = "0:a445adfaeaa61a6a74a49bd83ea486fb20bb36c8102f6c50c3150f95f2121819"
const msigkeys = {
    public: 'b0cb7e259c1c09b66a8cd1acdc6fe37103612b007d0c979ca17b27594b1f2813',
    secret: 'a7884a417468a8f12d58c3f319d40e7c09cb0382d8624735d54c04957a12ed24'
}

// let keys = {
//     "public": "2f7e706585d71064c1c95382aaab6cfbb6d8ecb3b892a9b5034ae02eb03e7f36",
//     "secret": "2f7e706585d71064c1c95382aaab6cfbb6d8ecb3b892a9b5034ae02eb03e7f36"
// };

export async function burnTokens() {
    // const walletAcc = new Account(SafeMultisigWallet, {
    //     address: giver.address,
    //     signer: signerKeys(giver.keys),
    //     client,
    // });
    const walletAcc = new Account(MsigContract, {
        address: walletAddrMsig,
        signer: signerKeys(msigkeys),
        client,
    });

    const TokenRootAcc = new Account(TokenRootContract, {
        address: TokenRoot.address,
        client,
    });

    const TokenProxy = new Account(TransferTokenProxyContract, {
        address: proxy.address,
        client,
    });

    try {

        // let WalletOfRes = await TokenRootAcc.runLocal("walletOf", { answerId: 0, walletOwner: walletAddrMsig});
        // const walletAddress = WalletOfRes.decoded.output.value0;
        let WalletOfRes = await TokenRootAcc.runLocal("walletOf", {answerId: 0, walletOwner: walletAddrMsig});
        const walletAddress = WalletOfRes.decoded.output.value0;

        console.log("walletAddress", walletAddress)
        // const TokenWalletAcc = new Account(TokenWalletContract, {
        //     address: walletAddress,
        //     signer: signerKeys(msigkeys),
        //     client,
        // });

        const paramsEvent = {
            recipient: TezosWalletAddress
        }

        let TokenProxyRes = await TokenProxy.runLocal("encodeTezosAddrPayload", paramsEvent);
        const eventData = TokenProxyRes.decoded.output.data;

        console.log("TokenWalletAccRes", eventData)

        //
        // let TokenWalletAccRes = await TokenWalletAcc.run("burn", {
        //     amount: 10,
        //     remainingGasTo: walletAddrMsig,
        //     callbackTo: TokenRoot.address,
        //     payload: eventData
        // });


        // console.log("TokenWalletAccRes", TokenWalletAccRes)


        const {body} = await client.abi.encode_message_body({
            abi: {type: 'Contract', value: TokenWalletContract.abi},
            call_set: {
                function_name: "burn",
                input: {
                    amount: 10,
                    remainingGasTo: walletAddrMsig,
                    callbackTo: proxy.address,
                    payload: eventData
                },
            },
            is_internal: true,
            signer: {type: 'None'},
        });

        return await walletAcc.run("sendTransaction", {
            dest: walletAddress,
            value: 1600000000,
            bounce: true,
            flags: 3,
            payload: body,
        })

    } catch (e) {

        console.log("sendEventDeployMsg", e);
        return e;
    }
}

export async function deployEvent(eventAddress, recipient, amount, eventBlockhash, aventTransactionHash, eventID) {
    console.log("deployEvent eventAddress", eventAddress, "recipient", recipient, "amount", amount, "eventBlockhash", eventBlockhash, "aventTransactionHash", aventTransactionHash, "eventID", eventID)
    // const walletAcc = new Account(SafeMultisigWallet, {
    //     address: giver.address,
    //     signer: signerKeys(giver.keys),
    //     client,
    // });
    const walletAcc = new Account(MsigContract, {
        address: walletAddrMsig,
        signer: signerKeys(msigkeys),
        client,
    });

    const proxyAcc = new Account(TransferTokenProxyContract, {
        address: proxy.address,
        signer: signerNone(),
        client,
    });

    const TECFacc = new Account(TezosEventConfigurationContract, {
        address: TECF.address,
        client,
    });
    const paramsEvent = {
        wid: 0,
        recipient: '0x' + recipient,
        amount: amount
    }

    let response = await proxyAcc.runLocal("encodeTezosEventData", paramsEvent);
    console.log("Contract reacted to your encodeTezosEventData:", response.decoded.output);

    const eventData = response.decoded.output.data;

    console.log("eventData", eventData)

    const eventVoteData = {
        eventID: eventID,
        eventBlockHash: toHex(eventBlockhash),
        // eventBlockHash: new BigNumber(`0x${toHex(eventBlockhash)}`),

        eventData: eventData,
        // eventTransactionHash: new BigNumber(`0x${toHex(aventTransactionHash)}`),
        eventTransactionHash: toHex(aventTransactionHash),
    };
    console.log("deployEvent eventVoteData", eventVoteData)
    try {
        const {body} = await client.abi.encode_message_body({
            abi: TECFacc.abi,
            call_set: {
                function_name: "deployEvent",
                input: {
                    answerId: 0,
                    eventVoteData: eventVoteData,
                },
            },
            is_internal: true,
            signer: {type: 'None'},
        });

        return await walletAcc.run("sendTransaction", {
            dest: TECF.address,
            value: 1600000000,
            bounce: true,
            flags: 3,
            payload: body,
        })

    } catch (e) {
        console.log("sendEventDeployMsg", e);
        return e;
    }
}
export async function queryByCode(code) {
    try {
        return (
            await client.net.query_collection({
                collection: 'accounts',
                filter: {
                    code_hash: {
                        eq: code,
                    },
                    // order: [{path: "created_at", direction: 'DESC'}],
                },

                result: 'id after',
            })
        ).result;
    } catch (error) {
        console.error(error);
    }
}
export async function getEventAddress(recipient, amount, eventBlockhash, aventTransactionHash, eventID) {
    const rootAcc = new Account(TezosEventConfigurationContract, {
        address: TECF.address,
        signer: signerNone(),
        client,
    });
    const proxyAcc = new Account(TransferTokenProxyContract, {
        address: proxy.address,
        signer: signerNone(),
        client,
    });
    const paramsEvent = {
        wid: 0,
        recipient: '0x' + recipient,
        amount: amount
    }
    try {
        let response = await proxyAcc.runLocal("encodeTezosEventData", paramsEvent);
        console.log("Contract reacted to your encodeTezosEventData:", response.decoded.output);

        const eventData = response.decoded.output.data;

        console.log("eventData", eventData)

        const eventVoteData = {
            eventID: eventID,
            eventBlockHash: toHex(eventBlockhash),
            eventData: eventData,
            eventTransactionHash: toHex(aventTransactionHash),
        };
        console.log("getEventAddress eventVoteData", eventVoteData)
        let res = await rootAcc.runLocal('deriveEventAddress', {answerId: 0, eventVoteData: eventVoteData,});
        console.log("deriveEventAddress", res.decoded.output)
        return {status: "success", address: res.decoded.output.eventContract}
    } catch (e) {
        console.log("getEventAddress error", e)
        return {status: "error", address: 0, error: e}
    }
}

export async function confirmEvent(eventAddress) {
    console.log("confirmEvent eventAddress", eventAddress)
    try {
        for (const relayKeys of relayKeysForConfirm) {
            const eventAcc = new Account(TezosTransferTokenEventContract, {
                address: eventAddress,
                signer: relayKeys,
                client,
            });

            let response = await eventAcc.run("confirm", {voteReceiver: eventAddress});
            console.log("Contract reacted to your confirm:", response.decoded.output);

        }
    } catch (e) {

        console.log("confirmEvent error", e)
        // return {status:"confirm error", error:e}
    }
}

export async function rejectEvent(eventAddress) {
    console.log("confirmEvent eventAddress", eventAddress)
    try {
        for (const relayKeys of relayKeysForConfirm) {
            const eventAcc = new Account(TezosTransferTokenEventContract, {
                address: eventAddress,
                signer: relayKeys,
                client,
            });

            let response = await eventAcc.run("reject", {voteReceiver: eventAddress});
            console.log("Contract reacted to your confirm:", response.decoded.output);

        }
    } catch (e) {
        console.log("confirmEvent error", e)
    }
}

export async function sendMoney(senderKeys, fromAddress, toAddress, amount) {
    console.log(senderKeys, fromAddress, toAddress, amount)
    const params = {
        send_events: false,
        message_encode_params: {
            address: fromAddress,
            abi: {
                type: 'Contract',
                value: "msigAbi"
            },
            call_set: {
                function_name: 'sendTransaction',
                input: {
                    dest: toAddress,
                    value: amount,
                    bounce: false,
                    flags: 0,
                    payload: ''
                },
            },
            signer: {
                type: 'Keys',
                keys: senderKeys
            }
        }
    }
    try {
        return await client.processing.process_message(params)
    } catch (e) {
        return e
    }

}

const SEED_PHRASE_WORD_COUNT = 12;
const SEED_PHRASE_DICTIONARY_ENGLISH = 1;
const HD_PATH = "m/44'/396'/0'/0/0";
const seedPhrase = "cloth meadow arrest script govern typical rescue web talent special enter area";

export async function getKeys() {
    try {

        let keys = await client.crypto.mnemonic_derive_sign_keys({
                dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
                word_count: SEED_PHRASE_WORD_COUNT,
                phrase: seedPhrase,
                path: HD_PATH
            }
        )
        console.log("my keys", keys)
        return keys
    } catch (e) {
        return e
    }

}

export const waitForDeploy = async function (address) {
    console.log("waitForDeploy addressss", address)
    let startTime = Date.now()
    try {
        const account = await client.net.wait_for_collection({
            collection: 'accounts',
            filter: {
                id: {eq: address},
            },
            result: 'boc',
        });
        const duration = Math.floor((Date.now() - startTime) / 1000);
        console.log(`Success. Account was deployed, it took ${duration} sec.\n`);
        return account;
    } catch (e) {
        console.log("e", e)
        return e
    }
}
const decode = {
    async message(abi, boc) {
        try {
            return await TonClient.default.abi.decode_message({
                abi: abiContract(abi),
                message: boc,
            });
        } catch (e) {
            console.log('17 error', e);
            return e.code;
        }
    },
};
const RPC_URL = 'https://hangzhounet.api.tez.ie';
const CONTRACT = 'KT1RAWE7SBg7NH7UuduktHjJv7gXhkEdf5ya';


export async function subscribeEver(address) {
    await client.net.subscribe_collection(
        {
            collection: 'messages',
            filter: {
                dst: {eq: address},
            },
            limit: 1,
            order: [{path: 'created_at', direction: 'DESC'}],
            result: 'id boc created_at body dst src',
        },
        async (params, responseType) => {
            console.log('client params ONLY', params);
            if (responseType === ResponseType.Custom) {
                let decoded = await decode.message(
                    TransferTokenProxyContract.abi,
                    params.result.boc,
                );

                if (decoded.name === 'onAcceptTokensBurn') {
                    console.log("decoded", decoded, "params", params)

                    try {


                        const proxyAcc = new Account(TransferTokenProxyContract, {
                            address: proxy.address,
                            // signer: signerNone(),
                            client,
                        });

                        let response = await proxyAcc.runLocal("decodeTezosAddrPayload", {data: decoded.value.payload});
                        console.log("Contract reacted to your encodeTezosEventData:", response.decoded.output.recipient);

                        // console.log("eventData", eventData)
                        let data = {
                            amount: decoded.value.amount,
                            walletOwner: decoded.value.walletOwner,
                            wallet: decoded.value.wallet,
                            remainingGasTo: decoded.value.remainingGasTo,
                            payload: decoded.value.payload,
                            decodedPayload: response.decoded.output.recipient,
                            created_at: params.result.created_at,
                            boc: params.result.boc,
                            id: params.result.id,
                        }

                        let svTdbRes = await saveToDB(data, EVERSCALE_EVENT)
                        console.log("svTdbRes", svTdbRes)


                        let signRes = await signMsg(response.decoded.output.recipient, decoded.value.amount)

                        await new token_transfer(RPC_URL).withdraw(CONTRACT, signRes.bytes, signRes.sig)

                        await updateEventDB(data.id, EVERSCALE_EVENT, EVENT_STATUS_CONFIRMED)


                    } catch (e) {
                        console.log("eerr", e)
                    }

                    // const SIGN_DATA = '0507070a00000016000096b0db6796bf2b43962095e78975207d3584444c0080c0f9decfae01' //публичный адрес отправителя — возьмите его из acc.ts
                    // const SIGN_CORE = 'sighWGAC8LyxRGpYBX4B2thMQLT5YEKLiDn686cqNQiwWLWjEZRb8khAkBXsyU2NQSnw8MwymwivggGA3DuJAQorJRw8Ee7m' //публичный адрес получателя — возьмите его из кошелька Tezos, который вы создали
                    //
                    //


                }
            }
        }
    ).handle;
    console.log('SUBSCRIBED TO client');

    // return { status: 'success', subscribedAddress: address };
}
