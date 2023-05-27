import { MigrationInterface, QueryRunner } from "typeorm";

export class Reservation1684979689078 implements MigrationInterface {
    name = 'Reservation1684979689078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservation" ("id" SERIAL NOT NULL, "timestamp" TIMESTAMP NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "testMigration" character varying NOT NULL, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "reservation"`);
    }

}