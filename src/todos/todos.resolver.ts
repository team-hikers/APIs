import { JwtAuthGuard } from './../auth/guard/jwt.guard';
import { Todo } from './entity/todo.entity';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { CreateTodoInput } from './dto/create-todo.input-type';
import { UseGuards } from '@nestjs/common';
import { DeleteTodoInput } from './dto/delete-todo.input-type';
import { UpdateTodoInput } from './dto/update-todo.input-type';
import { UpdateSequenceInput } from './dto/update-sequence.input-type';

@Resolver()
@UseGuards(JwtAuthGuard)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query((type) => [Todo])
  findAllTodos(@Context() context) {
    const { username } = context.user;
    return this.todosService.findAllTodos(username as string);
  }

  @Mutation((type) => Todo)
  createTodo(
    @Context() context,
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
  ) {
    const { username } = context.user;
    return this.todosService.createTodo(username, createTodoInput);
  }

  @Mutation((type) => Todo)
  deleteTodo(
    @Context() context,
    @Args('deleteTodoInput') deleteTodoInput: DeleteTodoInput,
  ) {
    const { username } = context.user;
    return this.todosService.deleteTodo(username, deleteTodoInput);
  }

  @Mutation((type) => Todo)
  updateTodo(
    @Context() context,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ) {
    const { username } = context.user;
    return this.todosService.updateTodo(username, updateTodoInput);
  }

  @Mutation((type) => [Todo])
  updateSequence(
    @Context() context,
    @Args('updateSequenceInput') updateSequenceInput: UpdateSequenceInput,
  ) {
    const { username } = context.user;
    return this.todosService.updateSequence(username, updateSequenceInput);
  }
}
