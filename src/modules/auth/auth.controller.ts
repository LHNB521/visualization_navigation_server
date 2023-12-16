import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LocalGuard } from '@/common/guards';
import { AuthService } from "./auth.service";
import { CustomException, ErrorCode } from "@/common/exceptions/custom.exception";

@Controller('auth') // @Controller()装饰器，这是必需的，用于定义一个基本的控制器, ip:3000/auth/...
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private userService: UserService,
    private configService: ConfigService,
  ){}

  @UseGuards(LocalGuard) //带上装饰器 @Injectable() 并实现了 CanActivate 接口的类，就是守卫。
  @Post('login')
  async login(@Req() req: any, @Body() body: any) {

    // 预览模式下，直接登录
    if(this.configService.get('IS_PREVIEW') === 'true' && body.isQuick){
      console.log('预览模式')
      // return this.authService.login(req.user,req.session?.code)
    }

    // 验证码校验
    // if(req.session?.code?.toLocaleLowerCase()!== body.captcha?.toLocaleLowerCase()){
    //   throw new CustomException(ErrorCode.ERR_10003)
    // }
    console.log(req.session, body)
    // return this.authService.login(req.user,req.session?.code)
  }
}
