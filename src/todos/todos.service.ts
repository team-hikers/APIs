import { DeleteTodoInput } from './dto/delete-todo.input-type';
import { Repository, Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoInput } from './dto/create-todo.input-type';
import { UpdateTodoInput } from './dto/update-todo.input-type';
import { UpdateSequenceInput } from './dto/update-sequence.input-type';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly connection: Connection,
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

  async updateSequence(
    username: string,
    updateSequenceInput: UpdateSequenceInput,
  ) {
    const { from, to } = updateSequenceInput;
    if (from == to) {
      return this.findAllTodos(username);
    }
    const [From, To] = await Promise.all([
      this.todoRepository.findOneByOrFail({ author: username, id: from }),
      this.todoRepository.findOneByOrFail({ author: username, id: to }),
    ]);
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      if (from < to) {
        await queryRunner.manager
          .getRepository(Todo)
          .createQueryBuilder()
          .update()
          .set({ sequence: () => 'sequence - 1' })
          .where('author = :username', { username })
          .andWhere('sequence > :from', { from: From.id })
          .andWhere('sequence <= :to', { to: To.id })
          .execute();
      } else {
        await queryRunner.manager
          .getRepository(Todo)
          .createQueryBuilder()
          .update()
          .set({ sequence: () => 'sequence + 1' })
          .where('userId = :username', { username })
          .andWhere('sequence > :from', { from: From.id })
          .andWhere('sequence <= :to', { to: To.id })
          .execute();
      }
      await queryRunner.manager
        .getRepository(Todo)
        .createQueryBuilder()
        .update()
        .set({ sequence: To.sequence })
        .where('id = :from', { from })
        .execute();
      await queryRunner.commitTransaction();
      return await this.findAllTodos(username);
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
