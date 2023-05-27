## Reservation booking system

### take real payment, persist reservation to mongodb database

### send email notification using gmail 

### using google cloud engine 

### email microservice (accept event for other service)

### TCP transport layer for the micorservice

### Move the code to kubernetes cluster and automate ci cd 

### expose 

## Prerequist

### FUndamental of nest (controller, interceptor, pipe)

## Project Dependencies

In order to follow along with the project, you will need some third-party software to build & run the project. Here is a list of the required tools with a link to installation instructions:



Development

pnpm: https://pnpm.io/installation

Nest CLI: https://docs.nestjs.com/cli/overview



Build & Deploy

Docker Dekstop: https://www.docker.com/products/docker-desktop/

kubectl: https://kubernetes.io/docs/tasks/tools/#kubectl

gcloud CLI: https://cloud.google.com/sdk/docs/install

repo : https://github.com/mguay22/sleepr


## 1. Common library 

All different microservice can use for all operation (database access, authentification, login)

Write this and import into each microservice that want to use (reuse) -- shared module

nest generate common

will add a project section in the nest-cli.json (to reference the new library)

## 2. Database && config module 

a. Install the database layer and config layer

pnpm i @nestjs/mongoose mongoose

for typeorm the installation is there : https://docs.nestjs.com/techniques/database

- in common library, will add: database module, configuration module(for read env var using dot env package)

pnpm install @nestjs/config

b. Génerate the database module in common library

nest generate module database -p common
nest generate module config -p common

Avoir notre propre module de configuration nous permet de l'adapter à notre facon il va nous permettre

- De charger toutes les variables d'environnement que l'on a en mémoire,
- Lire tous les .env que nous avons dans notre dossier 

c. Set up la connection a mongoose 

- add imports to the mongoose module with connection URI 

to connect to the local database : mongosh "mongodb://localhost/nest-microservice-kubernetes"
more info on mongosh : https://www.tutorialsteacher.com/mongodb/mongodb-shell-commands?utm_content=cmp-true

- Inject the env into config by using useFactory (allow to inject any argument in the module)
more info on the useFactory : https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory

it can be something like that
```
const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
  },
};

@Module({
  providers: [configFactory],
})
export class AppModule {}
```

or something like that for mongo : https://docs.nestjs.com/techniques/mongodb#hooks-middleware

```
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Cat.name,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const schema = CatsSchema;
          schema.pre('save', function() {
            console.log(
              `${configService.get('APP_NAME')}: Hello from pre save`,
            ),
          });
          return schema;
        },
        inject: [ConfigService],
      },
    ]),
  ],
})
export class AppModule {}
```

NB! Dans le (provider et export) exporter le service, dans le import (importer le module)

c. Validation pour le module de configuration (joi) to do schema validation like typeorm

## 3. Abstract repository

we abstract the mongo schema type

- all microservice in the architecture will based her schema on this absctract schema

and abstract the repository (all repository of microservice will extend from ) -- CRUD functionnality 

On va le marquer en readonly (dans le constructeur on déclare le model qui va issue le find, update, create, delete)

implementer les fonctionnalités commun a tous les repos 

## 4. Create your microservice

a. Generate a new app

`nest g app reservation`

import the database module in the microservice 

generate resource for the service `nest g resource reservation`

and replace all in the src of the service

Créer un repository pour le service (qui sera basé sur le repos abstrait) et sera une classe injectable

Passer le schema du service au repos car celui qui est abstrait doit recevoir un param abstrait

passer un methode static au module de la base de données (static for feature) qui prend en entrée un model

Dans le module du service on aura un truc comme sa:
```
imports: [DatabaseModule, DatabaseModule.forFeature([{name : ReservationDocument.name, schema: ReservationSchema}])],
```

Dans le module de la base de données on aura donc :
```
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]){
    return MongooseModule.forFeature(models)
  }
}
```

- Inject the repository in the service 

Sert à remplir les méthodes dans le service pour effectuer des actions sur la base de données

Adapter le DTO au schema du service

b. Validation
-------------

To check if data correspond to what we want to insert

pnpm install class-validator, and class-transformer 

nestjs pino (to log every request and response in the system and bind request data to log statement)

pnpm i nestjs-pino pino-http

- To add validation:

app.useGlobalPipes() -- middleware for the validation

```
  app.useGlobalPipes(new ValidationPipe())
  app.useLogger(app.get(Logger))
```

Dans le DTO, implémenter class validator afin de vérifier les données recu

```
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date; 

  @IsString()
  @IsNotEmpty()
  placeId : string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;
```

si on ne veut pas avoir de propriété additionnel on peut avoir   app.useGlobalPipes(new ValidationPipe({whitelist: true}))

@Type(()=>Date) (permet de transformer la string que l'on recoit en date)
pnpm i pino-pretty (to format log)

Un exemple d'abstraction simple du module logging est dans le dossier (libs/commons/logger)  qu'on exporte puis on importe dans chaque microservice

## 5. Dockerize the microservice

- Dockerfile for microservice


- Docker-compose to reload

```
    volumes:
      - .:/usr/src/app
```

Monte le dossier . (qui représente l'application) dans le /usr/src/app

- Docker compose ne parvient pas à accéder à la base de données (car elle tourne localement)

On va donc créer un conteneur qui va contenir la base de données (new Docker image for the database)

créerr un service mongo puis changer l'url dans l'env par localhost a mongo:27017


## Abstraction de la couche de base de données

- Detacher la logique business de nos services de la couche de base de données 

- permet que si on veut changer l'orm we can update the abstract clas

- important to structure the API poperly from the begining 


## Migration

Pour ce qui est de la migration : 

Après avoir configurer le datasource comme suit

```ts
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
```

vous remarquere que l'entities propertie pointe sur le dist/**/...

Cela implique que lors du build de l'application, vous devez désactiver webpack pour avoir tous les fichiers map dans le dist

Dans le package.json on a les lignes suivantes

```
    "typeorm": "npx typeorm-ts-node-commonjs -d ./libs/common/src/database/db/data-source.ts",
    "migration:generate": "pnpm run typeorm migration:generate",
    "migration:show": "pnpm run typeorm migration:show",
    "migration:run": "pnpm run typeorm migration:run",
    "migration:revert": "pnpm run typeorm migration:revert",
```

Pour exécuter le build avant la migration vous pouvez avoir

```
    "typeorm:prod": "pnpm run build && npx typeorm -d ./libs/common/src/database/db/data-source.ts",
    "migration:generate:prod": "pnpm run typeorm:prod migration:generate",
    "migration:run:prod": "pnpm run typeorm:prod migration:run",
    "migration:revert:prod": "pnpm run typeorm:prod migration:revert"
```

Pour générer donc votre migration vous éxécutez soit:

```
pnpm run build
pnpm run migration:generate libs/common/src/database/pg-database/migrations/Reservation
```

soit

```
pnpm run migration:generate libs/common/src/database/pg-database/migrations/Reservation
```

libs/common/src/database/pg-database/migrations/Reservation est le dossier de destination de votre fichier de migration



### Soucis à regler avec la migration

- Lorsqu'on fait le build de l'application avec webpack désactivé, on a les fichier compilé qui sont splité et on peut effectuer la migration en pointant les entités vers le dist. 

- Les soucis est au lancement de l'application qui n'arrive pas à résoudre les imports avec l'application qui est builder sans webpack

- Resolution: Dans le tsconfig de l'app mettez "outDir": "../../dist/" pour qu'il compile l'application a la racine du dist


Nouvelle compréhension de la migration: 

- Faire attention de pas avoir la création de table identique dans le fichier de migration
- Désactiver webpack, ce qui fera le build des différents entités, Run la migration puis lancer le serveur
- 

## Authentification

nest g app auth (microservice qui servira à authentifier l'utilisateur)

nest g module users (dans le service qui servira d'authentification on va avoir un module d'utilisateur)

nest g controller users

nest g service users

Add the new service to the authentification



