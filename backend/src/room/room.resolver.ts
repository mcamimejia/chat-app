import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { Room } from './room.schema';

@Resolver(() => Room)
export class RoomResolver {
    constructor(private roomService: RoomService) {}

    @Mutation(() => Room)
    async createRoom(@Args('name') name: string) {
        return this.roomService.createRoom(name);
    }

    @Query(() => [Room])
    async allRooms() {
        return this.roomService.getAllRooms();
    }
}