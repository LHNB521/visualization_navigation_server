import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  CustomException,
  ErrorCode,
  loginError,
  resourcePermission,
} from '../exceptions/custom.exception';
import { RedisService } from '@/modules/redis/redis.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, method } = request;
    const path = request.route.path;

    // 获取request请求中用户角色
    const currentRoleCode = user.currentRoleCode;
    // 获取注解中的用户角色
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // 当前request请求用户没有角色
    if (!currentRoleCode) throw new CustomException(ErrorCode.ERR_11005);
    if (roles?.length) {
      // 当前角色在不可操作角色范围内
      if (!roles.includes(currentRoleCode)) throw new CustomException(ErrorCode.ERR_11003);
      return true;
    }
    // 获取用户接口权限
    const data = JSON.parse(await this.redisService.getValue(`user:${user.userId}`));
    if (data == null) throw new loginError('请登录');
    const { resource } = data;
    resource.forEach((item: any) => {
      if (item.url === path && item.requestMethod === method) {
        return true;
      }
    });
    throw new resourcePermission('权限不足');
  }
}
