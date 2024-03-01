import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { RoleMenu } from '../role-menu/entities/role-menu.entity';
import { RoleResource } from '../role-resource/entities/role-resource.entity';

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

  @OneToMany(() => RoleMenu, (roleMenu) => roleMenu.role)
  roleMenus: RoleMenu[];

  @OneToMany(() => RoleResource, (roleResource) => roleResource.role)
  roleResources: RoleResource[];

  @OneToMany(() => User, (user) => user.userRole)
  users: User[];
}
