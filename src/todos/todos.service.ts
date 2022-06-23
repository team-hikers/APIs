import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoInput } from './input/create-todo.input-type';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAllTodos(author: string): Promise<Todo[]> {
    return await this.todoRepository.find({ where: { author } });
  }

  async createTodo(createTodoInput: CreateTodoInput): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoInput);
    return await this.todoRepository.save(todo);
  }

  async updateTodo() {
    return;
  }

  async deleteTodo() {
    return;
  }
}
