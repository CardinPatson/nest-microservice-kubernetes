import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import {TypeOrmModule} from "@nestjs/typeorm"
import { DataSource } from 'typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
@Module({
  imports : [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService)=>
        configService.get('mg-database'),
      inject: [ConfigService]
    }),
    TypeOrmModule.forRootAsync({
      // name: "pgDB",
      useFactory: async (configService: ConfigService) =>
        configService.get('pg-database'),

      inject: [ConfigService],
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    })
  ]

})
export class DatabaseModule {
  static mgForFeature(models: ModelDefinition[]){
    return MongooseModule.forFeature(models)
  }
  static pgForFeature(entity:EntityClassOrSchema[]){
    return TypeOrmModule.forFeature(entity)
  }
}