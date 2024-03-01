import { RoleResource } from '@/modules/role-resource/entities/role-resource.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('resource')
export class Resource {
  @PrimaryGeneratedColumn({ name: 'id', comment: '主键' })
  id: number;

  @Column({ name: 'resource_name', comment: '资源名', length: 50 })
  resourceName: string;

  @Column({
    name: 'url',
    nullable: true,
    comment: '权限路径',
    length: 255,
  })
  url: string | null;

  @Column({
    name: 'request_method',
    nullable: true,
    comment: '请求方式',
    length: 10,
  })
  requestMethod: string | null;

  @Column({ name: 'parent_id', nullable: true, comment: '父模块id' })
  parentId: number | null;

  @Column({
    name: 'is_anonymous',
    comment: '是否匿名访问 0否 1是',
    width: 1,
    default: () => "'0'",
  })
  isAnonymous: boolean;

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

  @OneToMany(() => RoleResource, (roleResource) => roleResource.resource)
  roleResources: RoleResource[];

  children: Resource[];
}
