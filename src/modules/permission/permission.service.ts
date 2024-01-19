import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { In, Repository } from 'typeorm';
import { CreatePermissionDto, UpdatePermissionDto } from './dto';
import { SharedService } from '@/shared/shared.service';

@Injectable()
export class PermissionService {
  constructor(
    private readonly sharedService: SharedService,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}
  // 新增权限
  create(createPermissionDto: CreatePermissionDto) {
    const createPermission = this.permissionRepo.create(createPermissionDto);
    return this.permissionRepo.save(createPermission);
  }
  // 批量新增权限
  createBatch(createPermissionDtos: CreatePermissionDto[]) {
    const permissions = this.permissionRepo.create(createPermissionDtos);
    return this.permissionRepo.save(permissions);
  }
  // 获取所有权限
  findAll() {
    return this.permissionRepo.find({ where: { type: 'MENU' } });
  }
  // 获取树形权限
  async findAllTree() {
    const permissions = await this.permissionRepo.find({
      order: { order: 'ASC' },
      where: { type: 'MENU' },
    });
    return this.sharedService.handleTree(permissions);
  }

  // 获取菜单树
  async findMenuTree() {
    const permissions = await this.permissionRepo.find({
      order: { order: 'ASC' },
      where: { type: 'MENU' },
    });
    return this.sharedService.handleTree(permissions);
  }

  // 更新权限
  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.permissionRepo.findOne({ where: { id } });
    if (!permission) throw new BadRequestException('权限不存在或者已删除');
    const newPermission = this.permissionRepo.merge(permission, updatePermissionDto);
    await this.permissionRepo.save(newPermission);
    return true;
  }

  // 递归删除所有子孙权限
  async remove(id: number) {
    const permission = await this.permissionRepo.findOne({
      where: { id },
      relations: { roles: true },
    });
    if (!permission) throw new BadRequestException('权限不存在或者已删除');
    if (permission.roles?.length) {
      throw new BadRequestException('当前权限存在已授权的角色，不允许删除！');
    }
    await this.permissionRepo.remove(permission);
    return true;
  }

  // 获取按钮和接口权限
  findButtonAndApi(parentId: number) {
    return this.permissionRepo.find({
      where: { parentId, type: In(['BUTTON', 'API']) },
    });
  }

  // 验证菜单路径是否存在
  async validateMenuPath(path: string) {
    const findMenu = await this.permissionRepo.findOne({
      where: { path: path, type: 'MENU' },
    });
    if (findMenu) return true;
    return false;
  }
}
