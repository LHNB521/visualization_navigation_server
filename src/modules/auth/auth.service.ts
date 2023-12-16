import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserService } from "@/modules/user/user.service";
import { compareSync } from 'bcrypt';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import { ConfigService } from "@nestjs/config";
import { RedisService } from "@/shared/redis.service";
import { ACCESS_TOKEN_EXPIRATION_TIME, USER_ACCESS_TOKEN_KEY } from '@/constants/redis.contant';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
    private configService: ConfigService,
  ) { }

  // 验证用户
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 登录
  async login(user: any, captcha?: string) {
    // 判断用户是否有enable属性为true的角色
    if (!user.roles?.some((item) => item.enable)) {
      throw new CustomException(ErrorCode.ERR_11003);
    }
    const roleCodes = user.roles?.map((item) => item.code);
    const currentRole = user.roles[0]
    const payload = {
      userId: user.id,
      username: user.username,
      roleCodes,
      currentRoleCode: currentRole.code,
    }
    if (this.configService.get('IS_PREVIEW') === 'true') payload['captcha'] = captcha;

    return this.generateToken(payload);
  }
  // 生成token
  generateToken(payload: any) {
    const accessToken = this.jwtService.sign(payload);
    this.redisService.set(
      this.getAccessTokenKey(payload),
      accessToken,
      ACCESS_TOKEN_EXPIRATION_TIME
    );
    return {
      accessToken,
    };
  }

  // 获取token的key
  getAccessTokenKey(payload: any) {
    return `${USER_ACCESS_TOKEN_KEY}:${payload.userId}${payload.captcha ? ':' + payload.captcha : ''}`;
  }

}