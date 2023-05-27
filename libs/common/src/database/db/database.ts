import * as path from 'path';
import {config} from "dotenv"
import { registerAs } from '@nestjs/config';
import { ConfigService as NestConfigModule } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// import { Reservation } from 'apps/reservation/src/models/reservation.entity';
import { Reservation } from 'apps/reservation/src/pg/models/reservation.entity';
import { Users } from 'apps/auth/src/pg/users/models/users.entity';
config()

const configService = new NestConfigModule();

export const pgDatabase = registerAs(
// export default registerAs(
    'pg-database',
  (): PostgresConnectionOptions =>
    ({
      logging: false,
      entities: [Reservation, Users],
      // entities: [path.resolve(`${__dirname}/../../../**/**.entity{.ts,.js}`)],
      migrations: [
        path.resolve(`${__dirname}/../pg-database/migrations/*{.ts,.js}`)
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