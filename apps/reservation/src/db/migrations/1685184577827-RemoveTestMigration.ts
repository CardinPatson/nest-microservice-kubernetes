import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTestMigration1685184577827 implements MigrationInterface {
    name = 'RemoveTestMigration1685184577827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "testMigration"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" ADD "testMigration" character varying NOT NULL`);
    }

}
