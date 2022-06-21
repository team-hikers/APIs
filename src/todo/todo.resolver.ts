import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver('Todo')
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation('createTodo')
  create(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Query('todo')
  findAll() {
    return this.todoService.findAll();
  }

  @Query('todo')
  findOne(@Args('id') id: number) {
    return this.todoService.findOne(id);
  }

  @Mutation('updateTodo')
  update(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation('removeTodo')
  remove(@Args('id') id: number) {
    return this.todoService.remove(id);
  }
}
