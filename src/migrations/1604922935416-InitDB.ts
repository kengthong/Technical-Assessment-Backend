import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDB1604922935416 implements MigrationInterface {
    name = 'InitDB1604922935416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "person"."occupationType" IS NULL`);
        await queryRunner.query(`ALTER TABLE "person" ALTER COLUMN "occupationType" SET DEFAULT 'UNEMPLOYED'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" ALTER COLUMN "occupationType" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "person"."occupationType" IS NULL`);
    }

}
