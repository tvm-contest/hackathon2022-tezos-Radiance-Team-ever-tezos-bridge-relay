import {TezosToolkit} from '@taquito/taquito';
import {InMemorySigner, importKey} from '@taquito/signer';
import {rpcTezos} from "../config";

const Tezos = new TezosToolkit(rpcTezos.HANGZHOUNET);

import {HubConnectionBuilder} from "@microsoft/signalr";
import {tzktApis} from "../config";
import {saveToDB, updateEventDB} from "../db/mongoDB";
import {
    confirmEvent,
    deployEvent,
    getAccType,
    getEventAddress,
    rejectEvent,
    waitForDeploy
} from "../everscaleSDK/EverSDK";
import {tezosEventConfigs} from "../mocks";
import fetch from 'node-fetch';



const TEZOS_EVENT = "tezosEvent"
const connection = new HubConnectionBuilder()
    .withUrl(tzktApis.HANGZHOU2NET)
    .withAutomaticReconnect()
    .build();

const EVENT_STATUS_EMITTED = "EMITTED"
const EVENT_STATUS_CONFIRMED = "CONFIRMED"
const EVENT_STATUS_PENDING = "PENDING"

const EVENT_STATUS_VALID = true
const EVENT_STATUS_INVALID = false


function validateEvent(fetchedData, eventData) {
    console.log("fetchedData, eventData",fetchedData, eventData)
    return true
    //
    // (fetchedData[0].id === eventData.id
    //     && fetchedData.parameter.value.requests[0].owner === eventData.owner
    //     && fetchedData.parameter.value.amt_for_deposit === eventData.amt_for_deposit
    //     && fetchedData.parameter.value.everscale_receiver === eventData.everscale_receiver
    // )
}


function getUrl(transactionHash) {
    return `https://api.hangzhou2net.tzkt.io/v1/operations/${transactionHash}`
}

export async function fetchtransactionHash(transactionHash) {
    await fetch(await getUrl(transactionHash))
        .then(res => res.json())
        .then(text => {
            return text
        })
        .catch(e => {
            return e
        })
}

export async function subscrTezos(item) {
    await connection.start();
    await connection.invoke("SubscribeToHead");
    await connection.invoke("SubscribeToOperations", {
        address: item,
        types: 'transaction'
    });
    // auto-reconnect
    connection.onclose(() => {
        console.log("CLOSED CONNECTION")
        subscrTezos(tezosEventConfigs[0].address)
    });

// connection.on("head", (msg) => {
//     console.log("head",msg);
// });

    connection.on("operations", async (msg) => {



        console.log("transaction", msg);

        if (msg.type === 0) return
        let transaction = msg.data[0]
        console.log("transaction", transaction);


        if (msg.data[0].status === "applied") {

            let data = {
                amt_for_deposit: transaction.parameter.value.amt_for_deposit,
                recipient: transaction.parameter.value.everscale_receiver,
                hash: transaction.hash,
                owner: transaction.parameter.value.requests[0].owner,
                token_id: transaction.parameter.value.requests[0].token_id,
                timestamp: transaction.timestamp,
                id: msg.data[3].id,
                block: transaction.block,
                status: EVENT_STATUS_EMITTED
            }
            let svTdbRes = await saveToDB(data, TEZOS_EVENT)
            console.log("svTdbRes", svTdbRes)

            let eventFetchRes = await getEventAddress(data.recipient, data.amt_for_deposit, data.block, data.hash, data.id)
            console.log("getEventAddress eventAddress", eventFetchRes)

            let deployEventRes = await deployEvent(eventFetchRes.address, data.recipient, data.amt_for_deposit, data.block, data.hash, data.id)
            console.log("deployEventRes", deployEventRes)

            let transactionData = await fetchtransactionHash(data)
            console.log("transactionData", transactionData)

            let isValid = await validateEvent(transactionData, data)
            console.log("isValid", isValid)


            let accType = await getAccType(eventFetchRes.address)
            console.log("accType", accType)
            if (accType.status === 1) {
                try {
                    await (isValid ? confirmEvent : rejectEvent)(eventFetchRes.address)
                    await updateEventDB(data.recipient, TEZOS_EVENT, EVENT_STATUS_CONFIRMED)
                } catch (e) {
                    console.log("acc_type 1 some error", e)
                }
            } else {
                try {
                    await updateEventDB(data.recipient, TEZOS_EVENT, EVENT_STATUS_PENDING)
                    await waitForDeploy(eventFetchRes.address)
                    await (isValid ? confirmEvent : rejectEvent)(eventFetchRes.address)
                    await updateEventDB(data.recipient, TEZOS_EVENT, EVENT_STATUS_CONFIRMED)
                } catch (e) {
                    console.log("acc_type 0 some error", e)
                }
            }
        } else {
            console.log("NOT APPLIED TRANSACTION", msg)
        }

    });
};


export async function getBalanceT() {
    Tezos.tz
        .getBalance("KT1RAWE7SBg7NH7UuduktHjJv7gXhkEdf5ya")
        .then((balance) => console.log(`${balance.toNumber() / 1000000} ꜩ`))
        .catch((error) => console.log(JSON.stringify(error)));
}

export async function allowance_to_factory(everAddress: string, amount: number) {
    Tezos.setProvider({
        signer: new InMemorySigner('edskRqEEB7cZt6KbDzXtV9cPcY6QMML1bZSSafpA5Lr3AzUok3PiKQxpMKiQNRF94per3DhqrmQfk9tjU5n9Xu2eNoAS5Wmb33'),
    });

    Tezos.contract
        //token address
        .at("tz1fBnrqSwg9s7foTDBXmnJpg9VYQjqosNjQ")

        .then((contract) => {
            return contract.methods.update_operators(amount, everAddress, 0).send();
        })
        .then((op) => {
            return op.confirmation(1).then(() => op.hash);
        })
        .then((hash) => console.log(`Operation injected: https://hangzhou.tzstats.com/${hash}`))
        .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
}

export async function deposit_to_factory(everAddress: string, amount: number) {
    Tezos.setProvider({
        signer: new InMemorySigner('edskRqEEB7cZt6KbDzXtV9cPcY6QMML1bZSSafpA5Lr3AzUok3PiKQxpMKiQNRF94per3DhqrmQfk9tjU5n9Xu2eNoAS5Wmb33'),
    });

    Tezos.contract
        .at(tezosEventConfigs[0].address)

        .then((contract) => {
            return contract.methods.deposit_to_factory(amount, everAddress, 0).send();
        })
        .then((op) => {
            return op.confirmation(1).then(() => op.hash);
        })
        .then((hash) => console.log(`Operation injected: https://hangzhou.tzstats.com/${hash}`))
        .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
}


export async function transferT(address: string, amount: number) {
    Tezos.setProvider({
        signer: new InMemorySigner('edskRqEEB7cZt6KbDzXtV9cPcY6QMML1bZSSafpA5Lr3AzUok3PiKQxpMKiQNRF94per3DhqrmQfk9tjU5n9Xu2eNoAS5Wmb33'),
    });

    Tezos.contract
        .transfer({to: address, amount: amount})
        .then((op) => {
            console.log(`Waiting for ${op.hash} to be confirmed...`);
            return op.confirmation(1).then(() => op.hash);
        })
        .then((hash) => console.log(`Operation injected: https://hangzhou.tzstats.com/${hash}`))
        .catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));
}


export async function faucetTezos(address: string) {
    const FAUCET_KEY = {
        "pkh": "tz1cQgKXMriXS9aEmWruotD8DTKarKRukbZ2",
        "mnemonic": [
            "alien",
            "amused",
            "middle",
            "fetch",
            "menu",
            "mirror",
            "swing",
            "weird",
            "history",
            "buyer",
            "arm",
            "property",
            "skull",
            "involve",
            "tail"
        ],
        "email": "hrqkxhli.ebuoowjm@teztnets.xyz",
        "password": "INoOQ1ZC2E",
        "amount": "17825398783",
        "secret": "d40c466abab3d384bd476f4ef6137a871aa2f71c"
    }

    await importKey(
        Tezos,
        FAUCET_KEY.email,
        FAUCET_KEY.password,
        FAUCET_KEY.mnemonic.join(' '),
        FAUCET_KEY.secret
    ).catch((e) => console.error(e));


    Tezos.contract
        .transfer({to: address, amount: +FAUCET_KEY.amount})
        .then((op) => {
            console.log(`Waiting for ${op.hash} to be confirmed...`);
            return op.confirmation(1).then(() => op.hash);
        })
        .then((hash) => console.log(`Operation injected: https://hangzhou.tzstats.com/${hash}`))
        .catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));

}
