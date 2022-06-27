import { DeleteTodoInput } from './dto/delete-todo.input-type';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoInput } from './dto/create-todo.input-type';
import { UpdateTodoInput } from './dto/update-todo.input-type';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAllTodos(username: string): Promise<Todo[]> {
    return await this.todoRepository.find({ where: { author: username } });
  }

  async createTodo(
    username: string,
    createTodoInput: CreateTodoInput,
  ): Promise<Todo> {
    const todo = this.todoRepository.create({
      ...createTodoInput,
      author: username,
    });
    return await this.todoRepository.save(todo);
  }

  async updateTodo(username: string, updateTodoInput: UpdateTodoInput) {
    const todo = await this.todoRepository.findOneByOrFail({
      id: updateTodoInput.id,
      author: username,
    });
    const newTodo = await this.todoRepository.save({
      ...todo,
      ...updateTodoInput,
    });
    return newTodo;
  }

  async deleteTodo(username: string, deleteTodoInput: DeleteTodoInput) {
    const todo = await this.todoRepository.findOneByOrFail({
      id: deleteTodoInput.id,
      author: username,
    });
    await this.todoRepository
      .createQueryBuilder()
      .where('author = :author', { author: username })
      .andWhere('id = :id', { id: deleteTodoInput.id })
      .delete()
      .execute();
    return todo;
  }
}
