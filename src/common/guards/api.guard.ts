import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RedisService } from '@/modules/redis/redis.service';
import { loginError, resourcePermission } from '../exceptions/custom.exception';

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取请求对象
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const path = request.route.path;
    const method = request.method;

    // admin跳过权限验证
    if (user.currentRoleCode === 'SUPER_ADMIN') return true;

    const data = JSON.parse(await this.redisService.getValue(`user:${user.userId}`));
    if (data == null) throw new loginError('请登录');
    const resource = data.resource;
    for (let i = 0; i < resource.length; i++) {
      if (resource[i].url == path && resource[i].requestMethod == method) {
        return true;
      }
    }

    throw new resourcePermission('权限不足');
  }
}
