import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guard/local.guard';
import { SignInResponse } from './dto/sign-in-response.object-type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // 로그인
  // GqlAuthGuard를 통해 validation 진행 후, signIn 함수를 통해 jwt 발급
  @Mutation((returns) => SignInResponse)
  @UseGuards(GqlAuthGuard)
  signIn(@Context() context) {
    return this.authService.signIn(context.user);
  }
}
