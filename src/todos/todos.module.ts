import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';
import { Todo } from './entity/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), AuthModule],
  providers: [TodosResolver, TodosService],
})
export class TodosModule {}
