import { AuthService } from './../auth.service';
import { User } from './../../users/entity/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly AuthService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.AuthService.validateUser({ username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
