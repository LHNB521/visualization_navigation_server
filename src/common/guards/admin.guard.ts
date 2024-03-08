import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RedisService } from '@/modules/redis/redis.service';
import { loginError, resourcePermission } from '../exceptions/custom.exception';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取请求对象
    const req = context.switchToHttp().getRequest();
    const path = req.route.path;
    const method = req.method;
    // admin跳过权限验证
    if (req.user.currentRoleCode === 'SUPER_ADMIN') return true;

    const data = JSON.parse(await this.redisService.getValue(`user:${req.user.userId}`));
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
