import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType() 
@Schema()
export class Message extends Document{
    @Field(() => ID)
    _id: string;
    
    @Field()
    @Prop()
    roomId: string;

    @Field()
    @Prop()
    senderId: string;

    @Field()
    @Prop()
    sendername: string;

    @Field()
    @Prop()
    content: string;

    @Field()
    @Prop()
    timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);