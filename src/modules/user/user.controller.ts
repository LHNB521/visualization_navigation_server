import { Body, Controller, Delete, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import { JwtGuard, PreviewGuard, RoleGuard } from '@/common/guards';
import { GetUserDto, CreateUserDto } from './dto'
import { Roles } from '@/common/decorators/roles.decorator';

@Controller('user')
@UseGuards(JwtGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  addUser(@Body() user: CreateUserDto) {
    return this.userService.create(user)
  }

  @Delete('delete/:id')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  deleteUser(@Param('id') id: number, @Request() req: any) {

    const currentUser = req.user

    if (currentUser.id === id) {
      throw new CustomException(ErrorCode.ERR_11006, '非法操作，不能删除自己！');
    }

    return this.userService.remove(id);
  }

  // 获取所有用户 
  @Get('list')
  getAllUsers(@Query() queryDto: GetUserDto) {
    return this.userService.findAll(queryDto)
  }
}
