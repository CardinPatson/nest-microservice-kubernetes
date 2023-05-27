// prend en entrée le nom du microservice pour lequel on veut générer la migration
// génère la migration dans le microservice 

//deux seuul paramètre ? (le nom du microservice et le nom de la migration) sinon: reject

// le premier paramètre est il un microservice sinon reject

// si c'est un microservice ex auth et le second paramètre est le nom de la migration (UserMigration)

// executer la command 

// pnpm run typeorm -d apps/auth/src/db/data-source migration:generate apps/auth/src/db/migrations UserMigration