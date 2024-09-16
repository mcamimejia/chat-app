import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType() 
@Schema()
export class User extends Document {
    @Field(() => ID)
    _id: string;

    @Field()
    @Prop({ required: true })
    username: string;

    @Field()
    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);