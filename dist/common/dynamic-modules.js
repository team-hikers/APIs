"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myJwtModule = exports.dbModule = void 0;
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const path = require("path");
const env_enum_1 = require("./env.enum");
exports.dbModule = typeorm_1.TypeOrmModule.forRootAsync({
    inject: [config_1.ConfigService],
    useFactory: async (configService) => ({
        type: 'mysql',
        entities: [path.join(__dirname + '/../**/entity/*.entity{.ts,.js}')],
        synchronize: configService.get(env_enum_1.envEnum.env) === 'dev',
        logging: configService.get(env_enum_1.envEnum.env) === 'dev',
        replication: {
            master: {
                host: configService.get(env_enum_1.envEnum.host) || 'localhost',
                port: +configService.get(env_enum_1.envEnum.dbPort) || 3306,
                username: configService.get(env_enum_1.envEnum.userName) || 'root',
                password: configService.get(env_enum_1.envEnum.password) || '',
                database: configService.get(env_enum_1.envEnum.database) || 'test',
            },
            slaves: Array(+configService.get(env_enum_1.envEnum.slaveNum))
                .fill(null)
                .map((_, index) => ({
                host: configService
                    .get(env_enum_1.envEnum.slaveHost)
                    .concat((index + 2).toString()),
                port: +configService.get(env_enum_1.envEnum.slavePort),
                username: configService
                    .get(env_enum_1.envEnum.slaveNames)
                    .concat(index.toString()),
                password: configService
                    .get(env_enum_1.envEnum.slavePasswords)
                    .concat(index.toString()),
                database: configService.get(env_enum_1.envEnum.slaveDatabase),
            })),
        },
    }),
});
exports.myJwtModule = jwt_1.JwtModule.registerAsync({
    inject: [config_1.ConfigService],
    useFactory: async (configService) => ({
        signOptions: { expiresIn: configService.get(env_enum_1.envEnum.jwtDuration) },
        secret: configService.get(env_enum_1.envEnum.secretKey),
    }),
});
//# sourceMappingURL=dynamic-modules.js.map