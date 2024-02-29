import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtGuard, LocalGuard, PreviewGuard } from '@/common/guards';
import { AuthService } from './auth.service';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import * as svgCaptcha from 'svg-captcha';
import { ChangePasswordDto } from './dto/dto';
import { UserService } from '@/modules/user/user.service';
import { Result } from '@/common/result/result';
import { RedisService } from '../redis/redis.service';
// import { ReturnType } from '@/common/decorators/return-type.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req: any, @Body() body: any) {
    // 预览模式下，直接登录
    if (this.configService.get('IS_PREVIEW') === 'true' && body.isQuick) {
      return this.authService.login(req.user, req.session?.captcha);
    }
    // 验证码校验
    if (req.session?.captcha?.toLocaleLowerCase() !== body.captcha?.toLocaleLowerCase()) {
      throw new CustomException(ErrorCode.ERR_10003);
    }
    const data = await this.authService.login(req.user, req.session?.captcha);
    // return new Result(data);
    return data;
  }

  // 获取验证码
  //利用svg-captcha生成校验码图片并存储在前端session中
  @Get('captcha')
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
    req.session.captcha = captcha.text; //存储验证码记录到session
    this.redisService.setValue(`vis_captcha:${captcha.text}`, captcha.text, 60);

    res.set('Access-Control-Allow-Origin', '*'); // 允许所有域名进行跨域请求
    res.set('Cross-Origin-Opener-Policy', 'cross-origin');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    res.type('image/svg+xml');
    res.send(captcha.data);
    return new Result(captcha.data);
  }

  // 退出登录
  @Post('logout')
  @UseGuards(JwtGuard)
  async logout(@Req() req: any) {
    return this.authService.logout(req.user);
  }

  // 修改密码
  @Post('password')
  @UseGuards(JwtGuard, PreviewGuard)
  async changePassword(@Req() req: any, @Body() body: ChangePasswordDto) {
    const ret = await this.authService.validateUser(req.user.username, body.oldPassword);
    if (!ret) {
      throw new CustomException(ErrorCode.ERR_10004);
    }
    // 修改密码
    await this.userService.resetPassword(req.user.id, body.newPassword);
    // 修改密码后退出登录
    await this.authService.logout(req.user);
    return true;
  }
}
