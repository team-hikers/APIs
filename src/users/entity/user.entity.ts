import { Todo } from './../../todos/entity/todo.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ name: 'username', type: 'varchar', unique: true, nullable: false })
  @Field()
  username: string;

  @Column({ name: 'password', nullable: false })
  @Field()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  @Field((type) => [Todo])
  todos: Todo[];
}
