import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.schema';
import { PubSub } from 'graphql-subscriptions';
import { SendMessageInput } from '../types';
import { Inject } from '@nestjs/common';

@Resolver(() => Message)
export class MessageResolver {
    constructor(
        @Inject('PUB_SUB') 
        private pubSub: PubSub,
        private messageService: MessageService
    ) {}

    @Query(() => [Message])
    async messages(@Args('roomId') roomId: string) {
        return this.messageService.getMessagesByRoom(roomId);
    }

    @Mutation(() => Message)
    async sendMessage( @Args('sendMessageInput') sendMessageInput: SendMessageInput): Promise<Message> {
        const { roomId, senderId, sendername, content } = sendMessageInput;
        const message = await this.messageService.createMessage(roomId, senderId, sendername, content);
        this.pubSub.publish('messageAdded', { messageAdded: message });
        return message;
    }

    @Subscription(() => Message, {
        filter: (payload, variables) => payload.messageAdded.roomId === variables.roomId,
    })

    messageAdded(@Args('roomId') roomId: string) {
        return this.pubSub.asyncIterator('messageAdded');
    }
}