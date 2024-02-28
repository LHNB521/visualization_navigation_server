import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Role } from '@/modules/role/role.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ comment: '自增id主键' })
  id: number;

  @Column({ unique: true, length: 50, comment: '用户名' })
  username: string;

  @Column({ select: false, comment: '密码' })
  password: string;

  @Column({ default: true })
  enable: boolean;

  @CreateDateColumn({ comment: '创建时间' })
  createTime: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateTime: Date;

  @OneToOne(() => Profile, (profile) => profile.user, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  profile: Profile;

  @ManyToMany(() => Role, (role) => role.users, {
    createForeignKeyConstraints: false,
  })
  @JoinTable()
  roles: Role[];

  // menus: Menu[];
}
