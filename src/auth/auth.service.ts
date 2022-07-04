import { User } from './../users/entity/user.entity';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInResponse } from './dto/sign-in-response.object-type';
import { SignInInput } from './dto/sign-in.input-type';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  // 로그인
  async signIn(user: User): Promise<SignInResponse> {
    const { username } = user;
    const token = this.jwtService.sign({ username });

    const response = { user: { username }, token };
    return response;
  }

  // 유저 검증 함수 - local strategy에서 이용
  async validateUser(signInInput: SignInInput): Promise<User> {
    const user = await this.usersService.findOne(signInInput.username);

    if (!user || user.password !== md5(signInInput.password)) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
