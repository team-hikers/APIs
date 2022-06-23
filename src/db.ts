import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { envEnum } from './common/env.enum';

export const dbModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    ({
      type: configService.get(envEnum.type) || 'mysql',
      host: configService.get(envEnum.host) || 'localhost',
      port: +configService.get(envEnum.dbPort) || 3306,
      username: configService.get(envEnum.userName) || 'root',
      password: configService.get(envEnum.password) || '',
      database: configService.get(envEnum.database) || 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: configService.get(envEnum.env) === 'dev',
    } as TypeOrmModuleAsyncOptions),
});
