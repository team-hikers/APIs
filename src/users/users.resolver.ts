import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignUpInput } from './dto/signup.input-type';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query((returns) => User)
  signIn(@Args('id') id: string, @Args('password') password: string) {
    return this.usersService.signIn(id, password);
  }

  @Mutation((returns) => User)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<User> {
    return this.usersService.signUp(signUpInput);
  }
}
