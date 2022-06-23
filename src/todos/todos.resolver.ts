import { Resolver } from '@nestjs/graphql';
import { TodosService } from './todos.service';

@Resolver()
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}
}
