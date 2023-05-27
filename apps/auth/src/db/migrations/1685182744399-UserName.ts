import { MigrationInterface, QueryRunner } from "typeorm";

export class UserName1685182744399 implements MigrationInterface {
    name = 'UserName1685182744399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "firstname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstname"`);
    }

}
