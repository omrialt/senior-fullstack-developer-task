import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserRole, UserStatus } from '../users/user.enums';

export class InitialUserRoleSetup1680000000000 implements MigrationInterface {
  name = 'InitialUserRoleSetup1680000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    roles TEXT NOT NULL DEFAULT '["${UserRole.USER}"]',
                    status TEXT NOT NULL DEFAULT '${UserStatus.ENABLED}'
                )
            `);

      await queryRunner.query(`
                INSERT OR IGNORE INTO users (username, roles, status) VALUES
                ('admin_user', '["${UserRole.ADMIN}"]', '${UserStatus.ENABLED}'),
                ('regular_user', '["${UserRole.USER}"]', '${UserStatus.ENABLED}'),
                ('editor_user', '["${UserRole.EDITOR}"]', '${UserStatus.ENABLED}'),
                ('deleted_user', '["${UserRole.USER}"]', '${UserStatus.DELETED}')
            `);
    } catch (error) {
      console.error('Migration up error:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`DROP TABLE IF EXISTS users`);
    } catch (error) {
      console.error('Migration down error:', error);
      throw error;
    }
  }
}
