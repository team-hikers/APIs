import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  // 로그인
  async signIn() {}

  // 회원가입
  async signUp() {}

  async findAll(id?): Promise<User[]> {
    return;
  }
}
