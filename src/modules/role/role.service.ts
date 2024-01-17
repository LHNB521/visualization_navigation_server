import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto, GetRolesDto, UpdateRoleDto } from './dto';
import { In, Repository } from 'typeorm';
import { Role } from './role.entity';
import { BadRequestException } from '@nestjs/common';
import { Permission } from '@/modules/permission/permission.entity';

export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  // 创建角色
  async create(createRoleDto: CreateRoleDto) {
    const existRole = await this.roleRepo.findOne({
      where: [{ name: createRoleDto.name }, { code: createRoleDto.code }],
    });
    if (existRole) throw new BadRequestException('角色已存在（角色名和角色编码不能重复）');

    const role = this.roleRepo.create(createRoleDto);
    if (createRoleDto.permissionIds) {
      role.permissions = await this.permissionRepo.find({
        where: { id: In(createRoleDto.permissionIds) },
      });
    }
    return this.roleRepo.save(role);
  }

  // 查询角色列表
  async findAll(query: GetRolesDto) {
    return this.roleRepo.find({ where: query });
  }

  // 更新角色
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    if (!role) throw new BadRequestException('角色不存在或者已删除');
    if (role.code === 'SUPER_ADMIN') throw new BadRequestException('不允许修改超级管理员');
    const newRole = this.roleRepo.merge(role, updateRoleDto);
    if (updateRoleDto.permissionIds) {
      newRole.permissions = await this.permissionRepo.find({
        where: { id: In(updateRoleDto.permissionIds) },
      });
    }
    await this.roleRepo.save(newRole);
    return true;
  }
  // 根据id查询角色
  findOne(id: number) {
    return this.roleRepo.findOne({ where: { id } });
  }
}
