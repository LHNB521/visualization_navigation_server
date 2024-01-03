import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
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
  addUser(@Body() user: CreateUserDto){
    return this.userService.create(user)
  }
  
  // 获取所有用户 
  @Get('list')
  getAllUsers(@Query() queryDto: GetUserDto) {
    return this.userService.findAll(queryDto)
  }
}
