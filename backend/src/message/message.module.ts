import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { Message, MessageSchema } from './message.schema';
import { pubSubProvider } from './pubsub.provider';

@Module({
    imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
    providers: [MessageService, MessageResolver, pubSubProvider],
    exports: [MessageService],
})
export class MessageModule {}