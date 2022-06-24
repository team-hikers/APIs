import { User } from '../../users/entity/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignInResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: Partial<User>;
}
