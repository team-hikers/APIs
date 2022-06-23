import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryColumn()
  @Field()
  id!: string;

  @Column()
  @Field()
  password!: string;

  @Field()
  token?: string;
}
