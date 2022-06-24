import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @Field()
  id: string;

  @Field()
  password: string;
}
