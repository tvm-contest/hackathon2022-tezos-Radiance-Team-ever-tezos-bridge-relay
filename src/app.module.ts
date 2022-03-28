import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EverChainModule} from "./everchain/everchain.module";

@Module({
  imports: [
    EverChainModule,
    MongooseModule.forRoot(`mongodb+srv://123456qwerty:123456qwerty@tonwallet.qvo7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useUnifiedTopology: true })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
