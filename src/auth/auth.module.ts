import { JwtStrategy } from './strategy/jwt.strategy';
import { myJwtModule } from '../common/dynamic-modules';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [UsersModule, PassportModule, myJwtModule],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
