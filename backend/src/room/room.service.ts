import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './room.schema';

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

    async createRoom(name: string): Promise<Room> {
        const newRoom = new this.roomModel({ name });
        return newRoom.save();
    }

    async getAllRooms(): Promise<Room[]> {
        return this.roomModel.find().exec();
    }
}