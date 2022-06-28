import { User } from './../../users/entity/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Index('author', ['author', 'sequence'])
@Entity()
export class Todo {
  @Field((type) => Int)
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Field()
  @Column({
    name: 'content',
    type: 'varchar',
    nullable: false,
  })
  content: string;

  @Field((type) => Int)
  @Column({
    name: 'isComplete',
    type: 'tinyint',
    unsigned: true,
    width: 1,
    default: () => 0,
    nullable: false,
  })
  isComplete: number;

  @Field((type) => Int)
  @Column({
    name: 'sequence',
    type: 'int',
    unsigned: true,
    nullable: false,
  })
  sequence: number;

  @Column({
    name: 'author',
    type: 'varchar',
    nullable: false,
  })
  @Field()
  author: string;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn([{ name: 'author', referencedColumnName: 'username' }])
  @Field((type) => User)
  user: User;
}
