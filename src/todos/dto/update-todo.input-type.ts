import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field((type) => Int)
  id!: number;

  @Field()
  content?: string;

  @Field((type) => Int)
  @IsInt()
  @Max(1)
  @Min(0)
  isComplete?: number;
}
