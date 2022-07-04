import { User } from './../users/entity/user.entity';
import { UsersService } from './../users/users.service';
import { SignInResponse } from './dto/sign-in-response.object-type';
import { SignInInput } from './dto/sign-in.input-type';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(user: User): Promise<SignInResponse>;
    validateUser(signInInput: SignInInput): Promise<User>;
}
