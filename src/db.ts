import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { envEnum } from './common/env.enum';

export const dbModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'mysql',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    replication: {
      master: {
        host: configService.get(envEnum.host) || 'localhost',
        port: +configService.get(envEnum.dbPort) || 3306,
        username: configService.get(envEnum.userName) || 'root',
        password: configService.get(envEnum.password) || '',
        database: configService.get(envEnum.database) || 'test',
        synchronize: configService.get(envEnum.env) === 'dev',
      },
      slaves: Array(+configService.get(envEnum.slaveNum)).map((_, index) => ({
        host: configService.get(envEnum.slaveHost),
        port: configService.get(envEnum.slavePort),
        username: configService.get(envEnum.slaveNames.split(',')[index]),
        password: configService.get(envEnum.slavePasswords.split(',')[index]),
        database: configService.get(envEnum.slaveDatabase),
      })),
    },
  }),
});
