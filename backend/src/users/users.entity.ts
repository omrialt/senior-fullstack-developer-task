import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole, UserStatus } from './user.enums';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({
    type: 'simple-json',
    default: () => `'["${UserRole.USER}"]'`,
  })
  roles: UserRole[];

  @Column({
    type: 'text',
    default: UserStatus.ENABLED,
  })
  status: UserStatus;
}
