import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleResource } from './entities/role-resource.entity';
import { Repository } from 'typeorm';
@Injectable()
export class RoleResourceService {
  constructor(
    @InjectRepository(RoleResource)
    private readonly roleResourceRepository: Repository<RoleResource>,
  ) {}

  // 通过roleId查询权限资源id
  async findIdByRoleId(roleId: number) {
    const data = await this.roleResourceRepository.find({
      where: { roleId },
    });
    const resourceIds = data.map((item) => item.resourceId);
    return resourceIds;
  }
}
