import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envEnum } from './env.enum';

export const dbModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'mysql',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: configService.get(envEnum.env) === 'dev',
    replication: {
      master: {
        host: configService.get(envEnum.host) || 'localhost',
        port: +configService.get(envEnum.dbPort) || 3306,
        username: configService.get(envEnum.userName) || 'root',
        password: configService.get(envEnum.password) || '',
        database: configService.get(envEnum.database) || 'test',
      },
      slaves: Array(+configService.get(envEnum.slaveNum)).map((_, index) => ({
        host: configService.get(envEnum.slaveHost),
        port: configService.get(envEnum.slavePort),
        username: configService
          .get(envEnum.slaveNames)
          .concat(index.toString()),
        password: configService
          .get(envEnum.slavePasswords)
          .concat(index.toString()),
        database: configService.get(envEnum.slaveDatabase),
      })),
    },
  }),
});

export const myJwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    signOptions: { expiresIn: configService.get(envEnum.jwtDuration) },
    secret: configService.get(envEnum.secretKey),
  }),
});
