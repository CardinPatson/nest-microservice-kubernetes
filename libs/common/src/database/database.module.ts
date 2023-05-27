import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import {TypeOrmModule} from "@nestjs/typeorm"
import { DataSource } from 'typeorm';
import { ConfigModule } from '../config/config.module';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
// import { pgDatabase, mgDatabase } from './db/database';
// import { Reservation } from 'apps/reservation/src/pg/models/reservation.entity';
// import { Users } from 'apps/auth/src/pg/users/models/users.entity';
@Module({
  imports : [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService)=>
        configService.get('mg-database'),
      // useFactory: (configService: ConfigService)=>({
      //   uri: configService.get('MONGODB_URI')
      // }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // name: "pgDB",
      useFactory: async (configService: ConfigService) =>
        configService.get('pg-database'),
      // useFactory: (configService: ConfigService) =>({
      //   type:'postgres',
      //   username: configService.get('POSTGRES_USER'),
      //   password: configService.get('POSTGRES_PASSWORD'),
      //   port: configService.get('POSTGRES_PORT'),
      //   host: configService.get('POSTGRES_HOST'),
      //   database:configService.get('POSTGRES_DB'),
      //   entities: [Reservation],
      //   synchronize: false,
      //   autoLoadEntities: true,
      // }),
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


//pg-database.module.ts

// import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { ConfigModule } from '../../config/config.module';
// import {TypeOrmModule} from "@nestjs/typeorm"
// import { DataSource } from 'typeorm';
// import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
// @Module({
//   imports : [
//     TypeOrmModule.forRootAsync({
//     imports: [ConfigModule],

//     useFactory: async (configService: ConfigService) =>
//       configService.get('pg-database'),
//     inject: [ConfigService],
//     dataSourceFactory: async (options) => {
//       const dataSource = await new DataSource(options).initialize();
//       return dataSource;
//     },
//   })],
// })
// export class PGDatabaseModule {
//   static forFeature(entity:EntityClassOrSchema[]){
//     return TypeOrmModule.forFeature(entity)
//   }
// }