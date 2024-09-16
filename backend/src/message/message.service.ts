import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

    async createMessage(roomId: string, senderId: string, sendername: string, content: string): Promise<Message> {
        const newMessage = new this.messageModel({ roomId, senderId, sendername, content, timestamp: new Date() });
        return newMessage.save();
    }

    async getMessagesByRoom(roomId: string): Promise<Message[]> {
        return this.messageModel.find({ roomId }).exec();
    }
}