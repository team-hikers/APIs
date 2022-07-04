import { AuthService } from './../auth.service';
import { User } from './../../users/entity/user.entity';
import { Strategy } from 'passport-local';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    validate(username: string, password: string): Promise<User>;
}
export {};
