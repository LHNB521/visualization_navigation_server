import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BaseService } from './base.service';
import { LocalAuthGuard } from '@/common/guards/local.auth.guard';
import { Public } from '@/common/decorators/public.decorator';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResultResponse } from '@/common/decorators/api-result-response.decorator';
import { LoginResDto } from './dto/response.dto';
import { LoginDto } from './dto/request.dto';

@ApiTags('登录登出')
@Controller('')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: LoginDto })
  @ApiResultResponse(LoginResDto)
  @Post('/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: any) {
    return this.baseService.login(req.user);
  }

  @ApiOperation({ summary: '登出' })
  @ApiResultResponse()
  @Post('/logout')
  async logout(@Req() req: any) {
    const { userId } = req.user;
    return this.baseService.logout(userId);
  }
}
