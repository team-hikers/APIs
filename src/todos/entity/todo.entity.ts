import { User } from './../../users/entity/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Todo {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  content!: string;

  @Field((type) => Int)
  @Column({ type: 'tinyint', width: 1, default: () => 0 })
  isComplete?: number;

  @Field((type) => Int)
  @Column()
  sequence: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  @Field((type) => User)
  author!: string;
}
