import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(username: string, password: string): Promise<User> {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const createdUser = new this.userModel({ username, password: hashedPassword });
        return createdUser.save();
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({ username });
    }
}

