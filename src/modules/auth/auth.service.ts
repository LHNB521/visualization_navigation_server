import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { ApiException } from '@/common/exceptions/api-exception';
import { BcryptService } from '../shared/bcrypt.service';
import { USER_TOKEN_KEY } from '@/common/constants/redis.contant';
import { RedisService } from '../redis/redis.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly bctyptService: BcryptService,
    private readonly redisSerivce: RedisService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 校验token
   * @param {number} userId 用户id
   * @param {string} token
   * @return {boolean}
   */
  async validateToken(userId: number, token: any) {
    const user = this.userService.getUserById(userId);
    if (!user) {
      throw new ApiException('用户认证失败！', 401);
    }
    const cacheToken = await this.redisSerivce.get(`${USER_TOKEN_KEY}:${userId}`);
    if (!cacheToken || token !== cacheToken) {
      throw new ApiException('登录状态已过期！', 401);
    }
    return true;
  }

  /**
   * 校验用户信息
   * @param {string} username
   * @param {string} password
   * @return {*}
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) throw new ApiException('用户不存在！');
    if (!(await this.bctyptService.compare(password, user.password)))
      throw new ApiException('密码错误!');
    return user;
  }

  /**
   * 移除token
   * @param {number} userId
   */
  removeToken(userId: number) {
    this.redisSerivce.del(`${USER_TOKEN_KEY}:${userId}`);
  }

  /**
   * 生成token
   * @param {Object} payload
   */
  generateToken(payload: { userId: number }) {
    const token = this.jwtService.sign(payload);
    this.redisSerivce.set(`${USER_TOKEN_KEY}:${payload.userId}`, token, 60 * 60 * 24 * 1000);
    return {
      token,
    };
  }
}
