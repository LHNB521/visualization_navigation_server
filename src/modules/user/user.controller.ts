import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from './user.service';

import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import { JwtGuard, PreviewGuard } from '@/common/guards';
import { GetUserDto, CreateUserDto, UpdatePasswordDto } from './dto/dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleGuard, ApiGuard } from '@/common/guards';
import { Result } from '@/common/result';

@ApiTags('用户管理')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseGuards(JwtGuard, RoleGuard, ApiGuard)
  addUser(@Body() user: CreateUserDto) {
    // return this.userService.create(user);
  }

  @Delete('delete/:id')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  deleteUser(@Param('id') id: number, @Request() req: any) {
    const currentUser = req.user;
    if (currentUser.id === id) {
      throw new CustomException(ErrorCode.ERR_11006, '非法操作，不能删除自己！');
    }
    return this.userService.remove(id);
  }

  // 获取所有用户
  @ApiOperation({ summary: '获取所有用户信息' })
  @ApiOkResponse({ type: GetUserDto })
  @Get('list')
  async findAll() {
    return new Result(await this.userService.findAll());
  }

  // 获取当前登录用户详情
  @Get('detail')
  async getUserInfor(@Req() res: any) {
    const userId = res.user.userId;
    const data = await this.userService.findUserDetail(userId);
    return new Result(data);
  }

  @Get('page')
  async findAllByPage(@Query() queryDto: GetUserDto) {
    return new Result(await this.userService.findAllByPage(queryDto));
  }

  // 管理员重置密码
  @Patch('password/reset/:userId')
  @Roles('SUPER_ADMIN')
  @UseGuards(PreviewGuard)
  resetPassword(@Param('userId') userId: number, @Body() dto: UpdatePasswordDto) {
    return this.userService.resetPassword(userId, dto.password);
  }
}
