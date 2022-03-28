import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EverService } from './everchain.service';
import { EverChainController } from './everchain.controller';
import { EverEvent, EverchainSchema } from './schemas/everchain.schema';

@Module({
    providers: [EverService],
    controllers: [EverChainController],
    imports: [
        MongooseModule.forFeature([
            {name: EverEvent.name, schema: EverchainSchema}
        ])
    ],
})
export class EverChainModule {
}
