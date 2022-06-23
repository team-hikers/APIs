import { Todo } from './../../todos/entity/todo.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  nickname: string;

  @Field()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.author)
  @Field((type) => [Todo])
  todos?: Todo[];
}
