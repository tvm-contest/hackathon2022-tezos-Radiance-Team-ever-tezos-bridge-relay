
const { MongoClient } = require("mongodb");
var _ = require('lodash');
//old uri for prev
const uri = "mongodb+srv://123456qwerty:123456qwerty@tonwallet.qvo7z.mongodb.net/TONWallet?retryWrites=true&w=majority&socketTimeoutMS=360000&connectTimeoutMS=360000";
// const uri = "mongodb+srv://radiance:NUJd55gVjQPc47c@cluster0.mtexh.mongodb.net/loggingDB?retryWrites=true&w=majority&autoReconnect=true&socketTimeoutMS=360000&connectTimeoutMS=360000";

const collections = ["disconnect", "login", "addLiquidity", "swap", "sendTransaction", "connectRoot", "sendTokens", "removeLiquidity"]


const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect()
    .then(res=>
    {console.log("db connected sc")
        // getSubscribedUsers().catch(e=>console.log("e", e))
    })
.catch(err=>console.log(err))


export let saveToDB = async function(data, collection){
    try {
        const database = client.db("Bridge");
        console.log("data",data,typeof data.collection)
        const logs = database.collection(collection);
        return await logs.insertOne(data);
    } catch(e){
        return e
    }
}

export let updateEventDB = async function(address, collection, status) {
    console.log("updateEventDB address, collection, status",address, collection, status)

    try {
        const database = client.db("Bridge");
        const users = database.collection(collection);
        const filter = {recipient:address};
        const updateDoc = {
            $set: {
                status:status,
            },
        };
        let updateRes = await users.updateOne(filter, updateDoc);
        console.log("updateRes",updateRes)
return updateRes
    } catch(e){
        return e
    }
}


//
// let saveLog = async function(data) {
//     try {
//         const database = client.db("RadianceLogger");
//         const logs = database.collection(data.name);
//         await logs.insertOne(data);
//         return {status:"success"};
//     } catch(e){
//         return e
//     }
// }
//
// let setNotDeployedUserToDB = async function(user) {
//     try {
//         const database = client.db("TONWallet");
//         const users = database.collection("users");
//         const result = await users.insertOne(user[0]);
//         let userDataToShow = [];
//         userDataToShow.push({"address":result.ops[0].address, "_id": result.ops[0]._id, "createAt":result.ops[0].createAt});
//         return userDataToShow;
//     } catch(e){
//         return e
//     }
// }
//
// function UserException(message) {
//     this.message = message;
//     this.name = "user exeption";
// }
// let getDataForWallet = async function(walletAddress) {
//     try {
//         const userData = await getUserByAddress({"address":walletAddress})
//         const msig = await getMsigWallet()
//         return [msig, userData]
//     } catch(e){
//         return e
//     }
// }
// let getUserByAddress = async function(walletAddress) {
//     try {
//         const database = client.db("TONWallet");
//         const users = database.collection("users");
//         const usersData = await users.findOne(walletAddress);
//         if(!usersData){
//             throw new UserException("cannot get user from db");
//         }
//         console.log("userData image getted success")
//         return usersData
//     } catch(e){
//         return e
//     }
// }
// let getMsigWallet = async function() {
//     try {
//         const database = client.db("TONWallet");
//         const img = database.collection("users");
//         const msig = await img.findOne({"name": "msigImage"});
//         if(!msig){
//             throw new UserException("cannot get msig image from db");
//         }
//         return msig
//     } catch(e) {
//         throw [e.name, e.message]
//     }
// }
// let updateUserDeployStatus = async function(address) {
//     try {
//         const database = client.db("TONWallet");
//         const users = database.collection("users");
//         const filter = {"address":address[0]};
//         const updateDoc = {
//             $set: {
//                 deployStatus:true,
//                 everscaleSDK:true
//             },
//         };
//         const result = await users.updateOne(filter, updateDoc);
//         if(!result){
//             throw new UserException("user update error");
//         }
//         console.log("Set deployed status success")
//         return {"deployStatus": "Success", "transactionID": address[1]}
//     } catch(e){
//         throw [e.name, e.message]
//     }
// }
// let updateTransactions = async function(transactionData) {
//     try {
//         const database = client.db("TONWallet");
//         const users = database.collection("users");
//         const filter = {"address":transactionData.dst};
//         const usersData = await users.findOne({"address":transactionData.dst});
//         let userDataTransactionsClone = _.cloneDeep(usersData.transactions);
//         userDataTransactionsClone.push({"src":transactionData.src, "value": transactionData.value, "createdAt":transactionData.createdAt})
//         const updateDoc = {
//             $set: {
//                 transactions:userDataTransactionsClone,
//             },
//         };
//         const result = await users.updateOne(filter, updateDoc);
//         if(!result){
//             throw new UserException("user update transactions array error");
//         }
//         return {"inserted count": result.modifiedCount}
//     } catch(e){
//         return [e.name, e.message]
//     }
// }
// let getSubscribedUsers = async function() {
//     try {
//         const database = client.db("TONWallet");
//         const users = database.collection("users");
//         await users.find({"everscaleSDK":true}).toArray(function(err, result) {
//             if (err) throw err;
//             result.map(item=>sdk.everscaleSDK((item.address)))
//             console.log("everscaleSDK to accounts from db - success")
//         });
//     } catch(e){
//         return [e.name, e.message]
//     }
// }
// let saveSubscribeID = async function(subData) {
//     try {
//         const database = client.db("TONWallet");
//         const users = database.collection("users");
//         const filter = {"address": subData.address};
//         const updateDoc = {
//             $set: {
//                 subscribeID: subData.subID,
//                 everscaleSDK:true
//             },
//         };
//         const result = await users.updateOne(filter, updateDoc);
//         if (!result) {
//             throw new UserException("user update error");
//         }
//     } catch(e){
//         return e
//     }
// }
// let unsubAtdb = async function(address) {
//     try {
//         const database = client.db("TONWallet");
//         const users = database.collection("users");
//         const filter = {"address": address};
//         const usersData = await users.findOne({"address":address});
//         const updateDoc = {
//             $set: {
//                 subscribeID: null,
//                 everscaleSDK:false
//             },
//         };
//         const result = await users.updateOne(filter, updateDoc);
//         if (!result) {
//             throw new UserException("user update error");
//         }
//         return usersData
//     } catch(e){
//         return e
//     }
// }
// module.exports.saveLog = saveLog;
// module.exports.getLogs = getLogs;
//
//
// module.exports.unsubAtdb = unsubAtdb;
// module.exports.saveSubscribeID = saveSubscribeID;
// module.exports.getSubscribedUsers = getSubscribedUsers;
// module.exports.updateTransactions = updateTransactions;
// module.exports.updateUserDeployStatus = updateUserDeployStatus;
// module.exports.getUserByAddress = getUserByAddress;
// module.exports.setNotDeployedUserToDB = setNotDeployedUserToDB;
// module.exports.getMsigWallet = getMsigWallet;
// module.exports.getDataForWallet = getDataForWallet;
