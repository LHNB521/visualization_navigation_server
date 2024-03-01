import { RoleMenu } from '@/modules/role-menu/entities/role-menu.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn({ name: 'id', comment: '主键' })
  id: number;

  @Column({ name: 'name', comment: '菜单名', length: 20 })
  name: string;

  @Column({ name: 'path', comment: '菜单路径', length: 50 })
  path: string;

  @Column({ name: 'component', comment: '组件', length: 50 })
  component: string;

  @Column({ name: 'icon', comment: '菜单icon', length: 50 })
  icon: string;

  // @CreateDateColumn({ comment: '创建时间' })
  @Column({
    name: 'create_time',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    nullable: true,
    comment: '更新时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date | null;

  @Column({ name: 'order_num', comment: '排序', width: 1 })
  orderNum: boolean;

  @Column({ name: 'parent_id', nullable: true, comment: '父id' })
  parentId: number | null;

  @Column({
    name: 'is_hidden',
    comment: '是否隐藏  0否1是',
    width: 1,
    default: () => "'0'",
  })
  isHidden: boolean;

  @OneToMany(() => RoleMenu, (roleMenu) => roleMenu.menu)
  roleMenus: RoleMenu[];

  children: Menu[];
}
