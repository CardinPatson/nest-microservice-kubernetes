import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import { DataSource } from 'typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Reservation } from 'apps/reservation/src/models/reservation.entity';

@Module({
  imports : [
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService)=>({
      type: 'postgres',
      host: configService.get('POSTGRES_HOST'),
      port: +configService.get('POSTGRES_PORT'),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DB'),
      entities: [Reservation],
      synchronize: true
    }),
    inject: [ConfigService],
    dataSourceFactory: async (options) => {
      const dataSource = await new DataSource(options).initialize();
      return dataSource;
    },
  })],
})
export class PGDatabaseModule {
  static forFeature(entity:EntityClassOrSchema[]){
    return TypeOrmModule.forFeature(entity)
  }
}
