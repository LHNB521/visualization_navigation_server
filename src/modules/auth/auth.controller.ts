import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as svgCaptcha from 'svg-captcha';
import { UserService } from '@/modules/user/user.service';
import { Result } from '@/common/result';
import { RedisService } from '../redis/redis.service';
import { Public } from '@/common/decorators/public.decorator';
import { JwtGuard } from '@/common/guards';

@Controller('auth')
@UseGuards(JwtGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private userService: UserService,
    // private readonly redisService: RedisService,
  ) {}

  // 获取验证码
  //利用svg-captcha生成校验码图片并存储在前端session中
  @Get('/captcha')
  @Public()
  createCaptcha(@Req() req: any, @Res() res: any) {
    const captcha = svgCaptcha.createMathExpr({
      size: 4,
      fontSize: 50,
      width: 80,
      height: 50,
      background: '#fff',
      color: true,
      mathMin: 0,
      mathMax: 9,
      mathOperator: '+',
    });
    req.session.captcha = captcha.text; // 存储验证码记录到session
    // this.redisService.setValue(`vis_captcha:${captcha.text}`, captcha.text, 60);
    res.set('Access-Control-Allow-Origin', '*'); // 允许所有域名进行跨域请求
    res.set('Cross-Origin-Opener-Policy', 'cross-origin');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    res.type('image/svg+xml');
    res.send(captcha.data);
    return new Result(captcha.data);
  }

  // 刷新token
  @Get('refresh/token')
  async refreshToken(@Req() req: any) {
    return this.authService.generateToken(req.user);
  }
}
