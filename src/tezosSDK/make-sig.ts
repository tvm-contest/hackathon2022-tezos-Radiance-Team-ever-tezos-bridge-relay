import { TezosToolkit } from '@taquito/taquito'
import { InMemorySigner } from '@taquito/signer'
import { Parser, packDataBytes, MichelsonData, MichelsonType } from '@taquito/michel-codec';
import {myKeys} from './acc';

const provider = 'https://hangzhounet.api.tez.ie'

export async function signMsg(withdraw_addr, withdraw_amt) {
  // const withdraw_addr = "tz1ZNov8u37BXAuvpeXALq1Gxg4to8GNtsP1";
  // const withdraw_amt = "3000000000000";
  console.log("withdraw_addr",withdraw_addr, "withdraw_amt",withdraw_amt)

  const data: MichelsonData = [{string:withdraw_addr},{int:withdraw_amt}]
  const typ: MichelsonType = [{prim:"address"},{prim:"nat"}]
  const packed = packDataBytes(data, typ);
  console.log(packed);

  try {
    const signer = new InMemorySigner(myKeys.secret);
    const signature = await signer.sign(packed.bytes);
    console.log('Signature:', signature)
    return signature
  } catch (err) {
    console.error(err)
    return err
  }
}


