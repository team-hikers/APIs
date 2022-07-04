import { User } from './../../users/entity/user.entity';
export declare class Todo {
    id: number;
    content: string;
    isComplete: number;
    sequence: number;
    author: string;
    user: User;
}
