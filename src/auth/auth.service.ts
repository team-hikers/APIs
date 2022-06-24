import { User } from './../users/entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { envEnum } from './../common/env.enum';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInResponse } from './dto/sign-in-response.object-type';
import { SignInInput } from './dto/sign-in.input-type';
import * as md5 from 'md5';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  // 로그인
  async signIn(user: User): Promise<SignInResponse> {
    const { id } = user;
    const token = this.jwtService.sign({ id });

    const response = { user: { id }, token };
    return response;
  }

  // 유저 검증 함수 - local strategy에서 이용
  async validateUser(signInInput: SignInInput): Promise<User> {
    const user = await this.usersService.findOne(signInInput.id);

    if (!user || user.password !== md5(signInInput.password)) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
