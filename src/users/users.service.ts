import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { envEnum } from 'src/common/env.enum';
import { Repository } from 'typeorm';
import { SignUpInput } from './dto/signup.input-type';
import { User } from './entity/user.entity';
import * as jwt from 'jsonwebtoken';
import * as md5 from 'md5';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}
  // 로그인
  async signIn(id: string, password: string) {
    let user = await this.userRepository.findOneOrFail({
      where: { id },
    });
    if (user.password !== md5(password)) return;
    const secretKey = this.configService.get(envEnum.secretKey);
    const jwtDuration = this.configService.get(envEnum.jwtDuration);
    const token = jwt.sign({ id }, secretKey, { expiresIn: jwtDuration });
    user = { ...user, token };
    return user;
  }

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

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
