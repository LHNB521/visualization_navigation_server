import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtGuard, LocalGuard, PreviewGuard } from '@/common/guards';
import { AuthService } from './auth.service';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import * as svgCaptcha from 'svg-captcha';
import { ChangePasswordDto } from './dto/dto';
import { UserService } from '@/modules/user/user.service';
import { Result } from '@/common/result';
import { RedisService } from '../redis/redis.service';
// import { ReturnType } from '@/common/decorators/return-type.decorator';
import { User } from '@/modules/user/entities/user.entity';
import { registerError } from '@/common/exception';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  // @UseGuards(LocalGuard)
  @Post('login')
  async login(@Body() userInfo: User | any) {
    const { username, password, captcha } = userInfo;
    const arrVal = [];
    const keys = await this.redisService.getAllKeys('vis_captcha:*');
    for (let i = 0; i < keys.length; i++) {
      const val = await this.redisService.getValue(keys[i]);
      arrVal.push(val);
    }
    let flag = false;
    for (let i = 0; i < arrVal.length; i++) {
      if (captcha?.toLocaleLowerCase() == arrVal[i].toLocaleLowerCase()) {
        flag = true;
        break;
      }
    }
    if (!flag) throw new registerError('验证码有误');

    const data = await this.authService.login(username, password);
    return new Result(data);
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
    req.session.captcha = captcha.text; // 存储验证码记录到session
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
    console.log(req.user);
    return this.authService.logout(req.user);
  }

  // 修改密码
  @Post('password')
  @UseGuards(JwtGuard, PreviewGuard)
  async changePassword(@Req() req: any, @Body() body: ChangePasswordDto) {
    // const ret = await this.authService.validateUser(req.user.username, body.oldPassword);
    // if (!ret) {
    //   throw new CustomException(ErrorCode.ERR_10004);
    // }
    // // 修改密码
    // await this.userService.resetPassword(req.user.id, body.newPassword);
    // // 修改密码后退出登录
    // await this.authService.logout(req.user);
    // return true;
  }
}
