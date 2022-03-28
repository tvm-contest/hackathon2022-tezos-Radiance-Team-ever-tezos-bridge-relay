import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type EverchainDocument = EverEvent & Document

@Schema()
export class EverEvent {
    @Prop()
    title: string

    @Prop()
    number: number
}

export const EverchainSchema = SchemaFactory.createForClass(EverEvent)
