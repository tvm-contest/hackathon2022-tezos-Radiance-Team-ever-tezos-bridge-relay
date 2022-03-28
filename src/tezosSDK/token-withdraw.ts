import { TezosToolkit } from '@taquito/taquito'
import { InMemorySigner } from '@taquito/signer'
import {myKeys} from './acc'
import {MichelsonData} from "@taquito/michel-codec";

console.log("myKeys",myKeys)

export class token_transfer {
  // настраиваем ссылку на публичный узел тестовой сети
  private tezos: TezosToolkit
  private initialization;
  rpcUrl: string

  constructor(rpcUrl: string) {
    this.tezos = new TezosToolkit(rpcUrl)
    this.rpcUrl = rpcUrl
    this.initialization = this.init();
  }

  async init() {
    this.tezos.setSignerProvider(await InMemorySigner.fromSecretKey(myKeys.secret))
  }
  // объявляем метод transfer, который принимает параметры:
  //
  // 1) contract — адрес контракта;
  // 2) sender — адрес отправителя;
  // 3) receiver — адрес получателя;
  // 4) amount — количество токенов для отправки.

  public async withdraw(contract: string, sign_data: string, sign_core: string) {
    console.log("contract",contract,"sign_data",sign_data,"sign_core",sign_core)
    // const withdraw_params: MichelsonData = [{signature:sign_core},{bytes:sign_data}]
    const withdraw_params = {


      sign_core: sign_core,
      sign_data: sign_data

      }

    this.tezos.contract
    .at(contract) //обращаемся к контракту по адресу
    .then((contract) => {
      console.log(`Withdraw from ${contract} ...`)
      //обращаемся к точке входа transfer, передаем ей адреса отправителя и получателя, а также количество токенов для отправки.
      // let methods = contract.parameterSchema.ExtractSignatures();

      console.log("methods",JSON.stringify(contract.methods.withdraw_from_vault().getSignature(), null, 2)
      );
      // console.log("contract.methods",contract.methods.withdraw_from_vault())

      return contract.methods.withdraw_from_vault(sign_core,sign_data).send()
    })
    .then((op) => {
      console.log(`Awaiting for ${op.hash} to be confirmed...`)
      return op.confirmation(1).then(() => op.hash) //ждем одно подтверждение сети
    })
    .then((hash) =>
    {
      console.log(`Hash: https://hangzhou2net.tzkt.io/${hash}`)
      return {hash:hash}
    }



    ) //получаем хеш операции
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`))
  }




}
