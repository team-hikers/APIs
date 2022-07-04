import { DeleteTodoInput } from './dto/delete-todo.input-type';
import { Repository, Connection } from 'typeorm';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input-type';
import { UpdateTodoInput } from './dto/update-todo.input-type';
import { UpdateSequenceInput } from './dto/update-sequence.input-type';
export declare class TodosService {
    private readonly todoRepository;
    private readonly connection;
    constructor(todoRepository: Repository<Todo>, connection: Connection);
    findAllTodos(username: string): Promise<Todo[]>;
    createTodo(username: string, createTodoInput: CreateTodoInput): Promise<Todo>;
    updateTodo(username: string, updateTodoInput: UpdateTodoInput): Promise<{
        id: number;
        content: string;
        isComplete: number;
        sequence: number;
        author: string;
        user: import("../users/entity/user.entity").User;
    } & Todo>;
    deleteTodo(username: string, deleteTodoInput: DeleteTodoInput): Promise<Todo>;
    updateSequence(username: string, updateSequenceInput: UpdateSequenceInput): Promise<Todo[]>;
}
