import { InjectRepository } from '@nestjs/typeorm';
import {
  AddRolePermissionsDto,
  AddRoleUsersDto,
  CreateRoleDto,
  GetRolesDto,
  UpdateRoleDto,
} from './dto';
import { In, Like, Repository } from 'typeorm';
import { Role } from './role.entity';
import { BadRequestException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // 创建角色
  async create(createRoleDto: CreateRoleDto) {
    const existRole = await this.roleRepo.findOne({
      where: [{ name: createRoleDto.name }, { code: createRoleDto.code }],
    });
    if (existRole) throw new BadRequestException('角色已存在（角色名和角色编码不能重复）');

    const role = this.roleRepo.create(createRoleDto);
    if (createRoleDto.permissionIds) {
      // role.permissions = await this.permissionRepo.find({
      //   where: { id: In(createRoleDto.permissionIds) },
      // });
    }
    return this.roleRepo.save(role);
  }

  // 查询角色列表
  async findAll(query: GetRolesDto) {
    const pageSize = query.pageSize || 10;
    const pageNum = query.pageNum || 1;
    const [data, total] = await this.roleRepo.findAndCount({
      where: {
        name: Like(`%${query.name || ''}%`),
        enable: query.enable || undefined,
      },
      order: {
        name: 'DESC',
      },
      take: pageSize,
      skip: (pageNum - 1) * pageSize,
    });
    const rows = data.map((item) => {
      return { ...item };
    });
    return { rows, total };
  }

  // 更新角色
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    if (!role) throw new BadRequestException('角色不存在或者已删除');
    if (role.code === 'SUPER_ADMIN') throw new BadRequestException('不允许修改超级管理员');
    const newRole = this.roleRepo.merge(role, updateRoleDto);
    if (updateRoleDto.permissionIds) {
      // newRole.permissions = await this.permissionRepo.find({
      //   where: { id: In(updateRoleDto.permissionIds) },
      // });
    }
    await this.roleRepo.save(newRole);
    return true;
  }
  // 根据id查询角色
  findOne(id: number) {
    return this.roleRepo.findOne({ where: { id } });
  }
  // 删除角色
  async delete(id: number) {
    const role = await this.roleRepo.findOne({
      where: { id },
      relations: { users: true },
    });
    if (!role) throw new BadRequestException('角色不存在或者已删除');
    if (role.code === 'SUPER_ADMIN') throw new BadRequestException('不允许删除超级管理员');
    if (role.users?.length) throw new BadRequestException('当前角色存在已授权的用户，不允许删除！');
    await this.roleRepo.remove(role);
    return true;
  }

  // 给角色分配用户
  async addRoleUsers(id: number, dto: AddRoleUsersDto) {
    const { userIds } = dto;
    const role = await this.roleRepo.findOne({
      where: { id },
      relations: { users: true },
    });
    if (!role) throw new BadRequestException('角色不存在或者已删除');
    const users = await this.userRepo.find({ where: { id: In(userIds) } });
    role.users = role.users.filter((item) => !userIds.includes(item.id)).concat(users);
    await this.roleRepo.save(role);
    return true;
  }
  // 取消用户角色分配
  async removeRoleUsers(id: number, dto: AddRoleUsersDto) {
    const { userIds } = dto;
    const role = await this.roleRepo.findOne({
      where: { id },
      relations: { users: true },
    });
    if (!role) throw new BadRequestException('角色不存在或者已删除');
    role.users = role.users.filter((item) => !userIds.includes(item.id));
    await this.roleRepo.save(role);
    return true;
  }

  // 查询角色拥有的权限
  async findRolePermissions(id: number) {
    const role = await this.findOne(id);
    if (!role) throw new BadRequestException('当前角色不存在或者已删除');
    // const res = await this.permissionRepo.find({ where: { roles: [role] } });
    // return res;
  }

  // 给角色分配权限
  async addRolePermissions(dto: AddRolePermissionsDto) {
    const { permissionIds, id } = dto;
    const role = await this.roleRepo.findOne({
      where: { id },
    });
    if (!role) throw new BadRequestException('角色不存在或者已删除');
    if (role.code === 'SUPER_ADMIN') throw new BadRequestException('无需给超级管理员授权');
    await this.roleRepo.save(role);
    return true;
  }

  // 获取角色拥有的权限树
  async findRolePermissionsTree(code: string) {
    const role = await this.roleRepo.findOne({ where: { code } });
    if (!role) throw new BadRequestException('当前角色不存在或者已删除');
    // const permissions = await this.permissionRepo.find({
    //   where: role.code === 'SUPER_ADMIN' ? undefined : { roles: [role] },
    // });
    // return this.sharedService.handleTree(permissions);
  }
}
