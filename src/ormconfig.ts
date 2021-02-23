import { ConnectionOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";
import {join} from 'path'

const configService = new ConfigService();

const ormconfig: ConnectionOptions  = {
  type: configService.get<'postgres'>('DB_CONNECTION'),
  host: configService.get<string>('DB_HOST'),
  port: Number(configService.get<number>('DB_PORT')),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  logging: true,
  logger: 'file',
  synchronize: false,
  dropSchema: false,
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
  subscribers: [__dirname + '/database/subscribers/**/*{.ts,.js}'],
  cli: {
    migrationsDir: join(__dirname, '/database/migrations')
  },
  migrationsTableName: 'migrations',
  migrationsRun: true
};

export = ormconfig;
