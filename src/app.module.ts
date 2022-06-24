import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { dbModule } from './common/dynamic-modules';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.env === 'dev',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    dbModule,
    UsersModule,
    TodosModule,
    AuthModule,
  ],
})
export class AppModule {}
