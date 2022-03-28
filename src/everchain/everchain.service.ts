import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EverEventDto } from './dto/everEvent.dto';
import { EverEvent, EverchainDocument } from './schemas/everchain.schema';
import {updateEverEventDto} from "./dto/updateEverEvent.dto";


@Injectable()
export class EverService {
    constructor(@InjectModel(EverEvent.name) private everChainModel: Model<EverchainDocument>) {
    }

    async getAll(): Promise<EverEvent[]> {
        return this.everChainModel.find().exec()
    }

    async getOne(id: string): Promise<EverEvent> {
        return this.everChainModel.findById(id)
    }

    async create(everEventDto: EverEventDto): Promise<EverEvent> {
        const newProduct = new this.everChainModel(everEventDto)
        return newProduct.save()
    }

    async remove(id: string): Promise<EverEvent> {
        return this.everChainModel.findByIdAndRemove(id)
    }

    async update(id: string, updateEverEvent: updateEverEventDto): Promise<EverEvent> {

        return this.everChainModel.findByIdAndUpdate(id, updateEverEvent)
    }
}
