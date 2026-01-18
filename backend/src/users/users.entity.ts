import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  ADMIN = 'Admin',
  EDITOR = 'Editor',
  USER = 'User',
}

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

  @Column()
  status: boolean;
}
