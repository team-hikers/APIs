import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateSequenceInput {
  @Field((type) => Int)
  from: number;

  @Field((type) => Int)
  to: number;
}
