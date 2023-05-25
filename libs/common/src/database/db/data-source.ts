import { DataSource, DataSourceOptions } from "typeorm"
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

const configService = new ConfigService();

config()

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'), // the name of your service
  port: parseInt(configService.get('POSTGRES_PORT'), 10) || 5432,
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  // entities: [path.resolve(`${__dirname}/../../../**/**.entity{.ts,.js}`)],
  entities: [`dist/**/**.entity{.ts,.js}`],
  migrations: [path.resolve(`${__dirname}/../pg-database/migrations/*{.ts,.js}`)],
  synchronize: false, // ! SET TO FALSE IN PRODUCTION
  logging: true

};

const dataSource = new DataSource(dataSourceOptions)
export default dataSource



