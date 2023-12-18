import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtGuard, LocalGuard } from '@/common/guards';
import { AuthService } from "./auth.service";
import { CustomException, ErrorCode } from "@/common/exceptions/custom.exception";
import * as svgCaptcha from 'svg-captcha';

@Controller('auth') // @Controller()装饰器，这是必需的，用于定义一个基本的控制器, ip:3000/auth/...
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private userService: UserService,
    private configService: ConfigService,
  ) { }

  @UseGuards(LocalGuard) //带上装饰器 @Injectable() 并实现了 CanActivate 接口的类，就是守卫。
  @Post('login')
  async login(@Req() req: any, @Body() body: any) {
    // 预览模式下，直接登录
    if (this.configService.get('IS_PREVIEW') === 'true' && body.isQuick) {
      console.log('预览模式')
      return this.authService.login(req.user, req.session?.code)
    }
    // 验证码校验
    if (req.session?.code?.toLocaleLowerCase() !== body.captcha?.toLocaleLowerCase()) {
      throw new CustomException(ErrorCode.ERR_10003)
    }
    return this.authService.login(req.user, req.session?.code)
  }

  // 获取验证码
  @Get('captcha')
  async createCaptcha(@Req() req: any, @Res() res: any) {
    const captcha = svgCaptcha.createMathExpr({
      size: 4,
      fontSize: 50,
      width: 80,
      height: 50,
      background: '#fff',
      color: true,
      // 数字的时候，设置下面属性。最大，最小，加或者减
      mathMin: 0,
      mathMax: 9,
      mathOperator: "+"
    });
    req.session.code = captcha.text || '';
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  // 退出登录
  @Post('logout')
  @UseGuards(JwtGuard)
  async logout(@Req() req: any) {
    return this.authService.logout(req.user);
  }



}
