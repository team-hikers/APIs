import { JwtAuthGuard } from './../auth/guard/jwt.guard';
import { Todo } from './entity/todo.entity';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { CreateTodoInput } from './dto/create-todo.input-type';
import { UseGuards } from '@nestjs/common';
import { DeleteTodoInput } from './dto/delete-todo.input-type';
import { UpdateTodoInput } from './dto/update-todo.input-type';

@Resolver()
@UseGuards(JwtAuthGuard)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query((type) => [Todo])
  findAllTodos(@Context() context) {
    const { id } = context.user;
    return this.todosService.findAllTodos(id as string);
  }

  @Mutation((type) => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todosService.createTodo(createTodoInput);
  }

  @Mutation((type) => Todo)
  deleteTodo(
    @Context() context,
    @Args('deleteTodoInput') deleteTodoInput: DeleteTodoInput,
  ) {
    const { id } = context.user;
    return this.todosService.deleteTodo(id, deleteTodoInput);
  }

  @Mutation((type) => Todo)
  updateTodo(
    @Context() context,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ) {
    const { id } = context.user;
    return this.todosService.updateTodo(id, updateTodoInput);
  }
}
