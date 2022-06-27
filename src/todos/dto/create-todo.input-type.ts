import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  MaxLength,
  MinLength,
  IsInt,
  Min,
  Max,
} from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  content!: string;

  @Field((type) => Int)
  @IsInt()
  @Min(0)
  @Max(1)
  isComplete?: number;
}
