import { Strategy } from 'passport-local';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: {
        username: string;
    }): Promise<{
        username: string;
    }>;
}
export {};
