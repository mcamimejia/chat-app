import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, LoginResponse } from '../types';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => LoginResponse)
    async login(
        @Args('loginInput') loginInput: LoginInput
    ): Promise<LoginResponse> {
        const { username, password } = loginInput;
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return this.authService.login(user);
    }
}