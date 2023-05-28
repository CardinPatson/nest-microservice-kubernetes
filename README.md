## MICROSERVICE APP WITH POSTGRES


### Installation du Backend

- Environement

Il est préférable de lancer le projet sur un environnement linux, si vous êtes sur windows, installez [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install):

- Installez [docker](https://docs.docker.com/engine/install/ubuntu/)

- Installez docker-compose

```
sudo apt install docker-compose
```

si vous avez les services postgresql et mongod actif, arreter les,


```
sudo service postgresql stop
sudo service mongod stop
```

- Installez [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)

A la racine du projet on a un docker-compose.yml qui lance chaque microservice

Installez [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) qui permet de gérer les versions de node

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

- Installez la la version  18.15.0 de Nodejs, installez pnpm et  la cli [nest](https://docs.nestjs.com/cli/overview) globalement

```
nvm install 18.15.0

npm install -g pnpm

npm install -g @nestjs/cli
```

Installez les dépendances et lancez l'application

```
pnpm install

docker-compose up
```


### Migration d'une entité

Chaque microservice possède son propre data-source qui importe les entités disponible dans le microservice

Pour chaque modification d'une entité on doit générer une nouvelle migration.

- Le data-source se trouvera toujours dans le dossier `<Microservice>/src/db/`
- Le dossier de migrations se trouve dans le dossier  `<Microservice>/src/db/migrations/`

Exemple

Pour générer une migration (AuthMigration) Pour le microservice Auth, la commande est donc

```
pnpm run typeorm -d auth/src/db/data-source.ts migration:generate auth/src/db/migrations/AuthMigration
```

En général

```
pnpm run typeorm -d <Microservice>/src/db/data-source.ts migration:generate <Microservice>/src/db/migrations/<NomMigration>
```

### Librarie commune

Elle est utilisé par tous les microservices qui effectue des opération communes. Elle permet abstraits les opérations liés à l'orm dans notre cas TypeORM

Elle est donc importé dans chaque microservice afin d'effectuer les opérations d'insertion, modification, recherche sur la base de données

### Microservice

Les différents microservices se trouvent dans le dossier app et sont lancés indépendament dans lors de l'éxécution du docker-compose

Chaque microservice a la même architecture


