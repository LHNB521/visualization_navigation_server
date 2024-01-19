import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto';
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
  // 获取树形菜单
  async findAllTree() {
    const permissions = await this.permissionRepo.find({
      order: { order: 'ASC' },
      where: { type: 'MENU' },
    });
    return this.sharedService.handleTree(permissions);
  }
}
