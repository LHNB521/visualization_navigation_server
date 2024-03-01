import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../profile.entity';
import { Role } from '@/modules/role/role.entity';
import { Menu } from '@/modules/menu/entities/menu.entity';
import { Resource } from '@/modules/resource/entities/resource.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ comment: '自增id主键' })
  id: number;

  @Column({ unique: true, length: 50, comment: '用户名' })
  username: string;

  @Column({ name: 'nickname', comment: '用户昵称', length: 50 })
  nickname: string;

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

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'userRoleId', referencedColumnName: 'id' }])
  userRole: Role;

  menus: Menu[];
  resources: Resource[];
}
