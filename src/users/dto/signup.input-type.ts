import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';
@InputType()
export class SignUpInput {
  @IsString()
  @MinLength(10)
  @MaxLength(24)
  @Field()
  username: string;

  @Field()
  @MinLength(6)
  @MaxLength(20)
  @IsString()
  password: string;
}
