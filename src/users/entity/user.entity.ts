import { Todo } from './../../todos/entity/todo.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryColumn()
  @Field()
  id!: string;

  @Column()
  @Field()
  password!: string;

  @OneToMany(() => Todo, (todo) => todo.author)
  @Field((type) => [Todo])
  todos?: Todo[];

  @Field()
  token?: string;
}
