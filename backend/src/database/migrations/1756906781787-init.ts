import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1756906781787 implements MigrationInterface {
  name = 'Init1756906781787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "superhero" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "real_name" character varying NOT NULL, "origin_description" text NOT NULL, "superpowers" text array NOT NULL, "catch_phrase" character varying NOT NULL, "images" text array NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b92ff773465116c2b5e215bb910" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "superhero"`);
  }
}
