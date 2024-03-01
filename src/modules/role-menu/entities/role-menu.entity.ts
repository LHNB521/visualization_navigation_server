// import { Role } from '@/modules/role/role.entity';
import { Menu } from '@/modules/menu/entities/menu.entity';
import { Role } from '@/modules/role/role.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Index('menu', ['menuId'], {})
@Index('role', ['roleId'], {})
@Entity('role_menu')
export class RoleMenu {
  @PrimaryGeneratedColumn({ name: 'id', comment: '主键' })
  id: number;

  @Column({ name: 'role_id', nullable: true, comment: '角色id' })
  roleId: number | null;

  @Column({ name: 'menu_id', nullable: true, comment: '菜单id' })
  menuId: number | null;

  @ManyToOne(() => Menu, (menu) => menu.roleMenus, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'menu_id', referencedColumnName: 'id' }])
  menu: Menu;

  @ManyToOne(() => Role, (role) => role.roleMenus, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Role;
}
