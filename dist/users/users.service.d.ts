import { Repository } from 'typeorm';
import { SignUpInput } from './dto/signup.input-type';
import { User } from './entity/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    signUp(signUpInput: SignUpInput): Promise<User | undefined>;
    findOne(username: string): Promise<User | undefined>;
}
