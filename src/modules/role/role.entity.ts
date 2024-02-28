import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/modules/user/user.entity';
import { Permission } from '@/modules/permission/permission.entity';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn({ name: 'id', comment: '角色id' })
  id: number;

  @Column({ name: 'code', unique: true, length: 50, comment: '角色code' })
  code: string;

  @Column({ name: 'name', unique: true, length: 50, comment: '角色名称' })
  name: string;

  @Column({ name: 'enable', default: () => true, comment: '是否启用' })
  enable: boolean;

  @ManyToMany(() => User, (user) => user.roles, {
    createForeignKeyConstraints: false,
  })
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    createForeignKeyConstraints: false,
  })
  @JoinTable()
  permissions: Permission[];
}
