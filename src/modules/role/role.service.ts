import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '../shared/utils.service';
import { Injectable } from '@nestjs/common';
import { ADMIN_ROLE_ID } from '@/common/constants/admin.constant';

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}

  /**
   * 通过单多个角色id获取权限
   * @param {Number} roleIds
   */
  async getPermissionsByRoleIds(roleIds: number[]) {
    // admin获取所有权限
    const whereQuery: Prisma.PermissionFindManyArgs = roleIds.includes(ADMIN_ROLE_ID)
      ? {}
      : {
          where: {
            rolePermissions: {
              some: {
                roleId: {
                  in: roleIds,
                },
              },
            },
          },
        };

    return await this.prisma.permission.findMany(whereQuery);
  }
}
