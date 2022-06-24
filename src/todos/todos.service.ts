import { DeleteTodoInput } from './dto/delete-todo.input-type';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoInput } from './input/create-todo.input-type';
import { UpdateTodoInput } from './dto/update-todo.input-type';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAllTodos(id: string): Promise<Todo[]> {
    return await this.todoRepository.find({ where: { author: id } });
  }

  async createTodo(createTodoInput: CreateTodoInput): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoInput);
    return await this.todoRepository.save(todo);
  }

  async updateTodo(id: string, updateTodoInput: UpdateTodoInput) {
    const todo = await this.todoRepository.findOneByOrFail({
      id: updateTodoInput.id,
      author: id,
    });
    const newTodo = await this.todoRepository.save({
      ...todo,
      ...updateTodoInput,
    });
    return newTodo;
  }

  async deleteTodo(id: string, deleteTodoInput: DeleteTodoInput) {
    const todo = await this.todoRepository.findOneByOrFail({
      id: deleteTodoInput.id,
      author: id,
    });
    await this.todoRepository
      .createQueryBuilder()
      .where('author = :author', { author: id })
      .andWhere('id = :id', { id: deleteTodoInput.id })
      .delete()
      .execute();
    return todo;
  }
}
