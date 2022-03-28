// import {HubConnectionBuilder} from "@microsoft/signalr";
// import {tzktApis} from "../config";
import {burnTokens, getAllEvents, getEvents, queryByCode, sendMoney, subscribeEver} from "../everscaleSDK/EverSDK";
// import {saveToDB} from "../db/mongoDB"
import {everEventConfigs, tezosEventConfigs} from "../mocks"
import {deposit_to_factory, getBalanceT, subscrTezos} from "../tezosSDK/TezosSDK";
import {proxy} from "../../keys/TransferTokenProxy";
import {EverscaleTransferTokenEventContract} from "../abis/EverscaleTransferTokenEvent";
import {TezosTransferTokenEventContract} from "../abis/TezosTransferTokenEvent";
import {signerNone} from "@tonclient/core";
import {Account} from "@tonclient/appkit";

let keys = {
    public: 'b0cb7e259c1c09b66a8cd1acdc6fe37103612b007d0c979ca17b27594b1f2813',
    secret: 'a7884a417468a8f12d58c3f319d40e7c09cb0382d8624735d54c04957a12ed24'
}

// const connection = new HubConnectionBuilder()
//     .withUrl(tzktApis.HANGZHOU2NET)
//     .build();

export async function init() {

    // await getEvents()

    // everEventConfigs.map(async (item)=>{
    //     console.log(item)
    const subRes = await subscribeEver(proxy.address)
    const subResT = await subscrTezos(tezosEventConfigs[0].address)
    // const subResT = await subscrTezos("KT1Ua1r4kEBUQ4vP546QyCc5WK6sadvesoPu")
// const balanc = await getBalanceT()
//     console.log("balanc",balanc)
    // const res = await burnTokens()
    // console.log("burnTokens", res)

    //     console.log("initial everscaleSDK to Everscale config success",subRes)
    //
    //     // const res = await saveToDB(subRes)
    //     // console.log("res",res)
    //
    //
    // })
    // tezosEventConfigs.map(async (item)=>{
    //     console.log(item)

    // const everEvents = await queryByCode("a06e0137f62a2e0185dde90afe4d677c9b46f9a46b20fd877a4d8d4132c62078")
    // // const res = await saveToDB(subRes)
    // console.log("everEvents", everEvents)


    // })

    // deposit_to_factory("0:4594ac781bdcdee350c9c8c25dfaf08d067b1214fa86c687f4deca048a76551f",3)

    // await connection.start();
    // await connection.invoke("SubscribeToHead");
    // await connection.invoke("SubscribeToOperations", {
    //     address: 'tz1hvKQyP7HvHP3iBD3WqMumLtJKfQ1bihkx',
    //     types: 'transaction'
    // });
};
//
// // auto-reconnect
// connection.onclose(init);
//
// // connection.on("head", (msg) => {
// //     console.log("head",msg);
// // });
//
// connection.on("operations", async (msg) => {
//     console.log("operations",msg);
//     const res = await sendMoney(keys, "0:a445adfaeaa61a6a74a49bd83ea486fb20bb36c8102f6c50c3150f95f2121819", "0:d0406cd4dc65f17c319c3e4050fa70a5447fb387a86ad24eabc812981ee23e11", 2000000000)
//
// });



