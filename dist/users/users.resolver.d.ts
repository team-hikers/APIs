import { SignUpInput } from './dto/signup.input-type';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    signUp(signUpInput: SignUpInput): Promise<User>;
}
