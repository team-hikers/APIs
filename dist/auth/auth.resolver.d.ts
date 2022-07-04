import { AuthService } from './auth.service';
import { SignInResponse } from './dto/sign-in-response.object-type';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(context: any): Promise<SignInResponse>;
}
