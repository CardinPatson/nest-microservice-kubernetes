import * as path from 'path';
import {config} from "dotenv"
import { registerAs } from '@nestjs/config';
import { ConfigService as NestConfigModule } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Users } from '../pg/users/models/users.entity';
config()

const configService = new NestConfigModule();

export const pgDatabase = registerAs(
    'pg-database',
  (): PostgresConnectionOptions =>
    ({
      logging: false,
      entities: [Users],
      migrations: [
        path.resolve(`${__dirname}/migrations/*{.ts,.js}`)
      ],
      autoLoadEntities: true,
      migrationsRun: true,
      migrationsTableName: 'migrations',
      keepConnectionAlive: true,
      synchronize: false,
      type: 'postgres',
      host: configService.get('POSTGRES_HOST'),
      port: parseInt(configService.get('POSTGRES_PORT'), 10) || 5432,
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DB'),
    } as PostgresConnectionOptions)
);

export const mgDatabase = registerAs(
  "mg-database",
  ()=>({
    uri: configService.get("MONGODB_URI")
  })
)