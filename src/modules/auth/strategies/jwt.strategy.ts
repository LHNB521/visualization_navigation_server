import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true, //设置回调的第一个参数是  request
    });
  }

  /**
   * JWT验证
   * @param {Request} request
   * @param {*} payload
   */
  async validate(request: Request, payload: any) {
    const token = (request.headers as any).authorization?.split(' ')[1];
    await this.authService.validateToken(payload, token);
    return {
      userId: payload.userId,
      username: payload.username,
      currentRoleCode: payload.currentRoleCode,
    };
  }
}
