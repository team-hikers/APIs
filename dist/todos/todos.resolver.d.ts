import { Todo } from './entity/todo.entity';
import { TodosService } from './todos.service';
import { CreateTodoInput } from './dto/create-todo.input-type';
import { DeleteTodoInput } from './dto/delete-todo.input-type';
import { UpdateTodoInput } from './dto/update-todo.input-type';
import { UpdateSequenceInput } from './dto/update-sequence.input-type';
export declare class TodosResolver {
    private readonly todosService;
    constructor(todosService: TodosService);
    findAllTodos(context: any): Promise<Todo[]>;
    createTodo(context: any, createTodoInput: CreateTodoInput): Promise<Todo>;
    deleteTodo(context: any, deleteTodoInput: DeleteTodoInput): Promise<Todo>;
    updateTodo(context: any, updateTodoInput: UpdateTodoInput): Promise<{
        id: number;
        content: string;
        isComplete: number;
        sequence: number;
        author: string;
        user: import("../users/entity/user.entity").User;
    } & Todo>;
    updateSequence(context: any, updateSequenceInput: UpdateSequenceInput): Promise<Todo[]>;
}
