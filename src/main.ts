import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {getKeys,waitForDeploy} from "./everscaleSDK/EverSDK"
import {init} from "./init/init";
import {transferT} from "./tezosSDK/TezosSDK";



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3005);
//   const arr = await everscaleSDK("0:a445adfaeaa61a6a74a49bd83ea486fb20bb36c8102f6c50c3150f95f2121819")
// console.log(arr)
  await init()
  // let res = await waitForDeploy("0:45d7ce234155b87ffdbc12eb809a821eb69c83ce87d829913422185916e464e5")
  // console.log("res",res)
//   await getTezosBalance()
//   await transferT("tz1hvKQyP7HvHP3iBD3WqMumLtJKfQ1bihkx", 1)
}
bootstrap();
