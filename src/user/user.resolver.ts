import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService
    ){}

    @Query(() => [User])
    async users(): Promise<User[]> {
        const users = await this.userService.findAllUsers();
        return users;
    }

    @Mutation(() => User)
    async createUser(
        @Args('data') data: CreateUserInput
    ): Promise<User> {
        const user = await this.userService.createUser(data);
        return user;
    }

    @Mutation(() => User)
    async updateUser(
        @Args('id') id: string,
        @Args('data') data: UpdateUserInput
    ): Promise<User> {
        const user = await this.userService.updateUser(id, data)
        return user;
    }

    @Mutation(() => Boolean)
    async deleteUser(
        @Args('id') id: string
    ): Promise<boolean>{
        return await this.userService.deleteUser(id);
    }
}
