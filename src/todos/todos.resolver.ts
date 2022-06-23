import { Todo } from './entity/todo.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { CreateTodoInput } from './input/create-todo.input-type';

@Resolver()
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query()
  findAllTodos() {
    let author;
    return this.todosService.findAllTodos(author);
  }

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todosService.createTodo(createTodoInput);
  }
}
