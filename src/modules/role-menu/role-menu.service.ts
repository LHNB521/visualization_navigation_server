import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleMenu } from './entities/role-menu.entity';

@Injectable()
export class RoleMenuService {
  constructor(
    @InjectRepository(RoleMenu)
    private readonly roleMenuRepository: Repository<RoleMenu>,
  ) {}

  // 根据角色id查询菜单id
  async findIdByRoleId(roleId: number) {
    const data = await this.roleMenuRepository.find({
      where: { roleId },
    });
    const menuIds = data.map((item) => item.menuId);
    return menuIds;
  }
}
