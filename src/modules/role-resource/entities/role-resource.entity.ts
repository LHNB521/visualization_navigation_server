import { Resource } from '@/modules/resource/entities/resource.entity';
import { Role } from '@/modules/role/role.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Role } from '@/modules/role/role.entity';

@Index('resourceId', ['resourceId'], {})
@Index('roleId', ['roleId'], {})
@Entity('role_resource')
export class RoleResource {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'role_id', nullable: true, comment: '角色id' })
  roleId: number | null;

  @Column({ name: 'resource_id', nullable: true, comment: '权限id' })
  resourceId: number | null;

  @ManyToOne(() => Resource, (resource) => resource.roleResources, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'resource_id', referencedColumnName: 'id' }])
  resource: Resource;

  @ManyToOne(() => Role, (role) => role.roleResources, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Role;
}
