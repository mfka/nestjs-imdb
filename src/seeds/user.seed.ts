/* eslint-disable */

import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../users/user.entity';
import { PasswordManager } from '../users/password.manager';

export class seedUsers1579001904463 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const admin = {
      email: 'admin@admin.com',
      password: await new PasswordManager().encode('admin'),
    };
    await getRepository(User).save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
