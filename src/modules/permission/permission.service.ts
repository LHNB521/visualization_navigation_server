import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}
  // 新增权限
  create(createPermissionDto: CreatePermissionDto) {
    const createPermission = this.permissionRepo.create(createPermissionDto);
    return this.permissionRepo.save(createPermission);
  }
  // 获取所有权限
  findAll() {
    return this.permissionRepo.find({ where: { type: 'MENU' } });
  }
}
