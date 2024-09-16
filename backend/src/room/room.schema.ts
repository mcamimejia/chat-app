import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType() 
@Schema()
export class Room extends Document{
    @Field(() => ID)
    _id: string;
    
    @Field()
    @Prop()
    name: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);