import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { User } from './user/user.schema';
import { Message } from './message/message.schema';

@ObjectType()
export class LoginResponse {
    @Field()
    access_token: string;

    @Field(() => User)
    userInfo: User;
}

@InputType()
export class LoginInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@ObjectType()
export class CreateUserResponse {
    @Field(() => User)
    user: User;
}

@InputType()
export class CreateUserInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@ObjectType()
export class SendMessageResponse {
    @Field(() => Message)
    message: Message;
}

@InputType()
export class SendMessageInput {
    @Field()
    roomId: string;

    @Field()
    senderId: string;

    @Field()
    sendername: string;

    @Field()
    content: string;
}