import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { envEnum } from 'src/common/env.enum';
import { Repository } from 'typeorm';
import { SignUpInput } from './dto/signup.input-type';
import { User } from './entity/user.entity';
import * as md5 from 'md5';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // 회원가입
  async signUp(signUpInput: SignUpInput): Promise<User | undefined> {
    if (
      !(await this.userRepository
        .createQueryBuilder()
        .where('id = :id', { id: signUpInput.id })
        .getCount())
    ) {
      const newUser = this.userRepository.create({
        ...signUpInput,
        password: md5(signUpInput.password),
      });
      return await this.userRepository.save(newUser);
    }
    return;
  }

  async findOne(id: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ id });
  }
}
