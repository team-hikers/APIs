import { User } from '../../users/entity/user.entity';
export declare class SignInResponse {
    token: string;
    user: Partial<User>;
}
