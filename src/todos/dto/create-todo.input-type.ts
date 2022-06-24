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
export class SignUpInput {
  @IsString()
  @MinLength(10)
  @MaxLength(24)
  @Field()
  id: string;

  @Field()
  @MinLength(6)
  @MaxLength(20)
  @IsString()
  password: string;
}

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
