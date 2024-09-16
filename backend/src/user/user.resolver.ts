import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserInput } from '../types';

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Mutation(() => User)
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput
    ): Promise<User> {
        const { username, password } = createUserInput;
        return this.userService.createUser(username, password);
    }
}