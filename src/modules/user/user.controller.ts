import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import { JwtGuard, RoleGuard } from '@/common/guards';
import { GetUserDto } from './dto'

@Controller('user')
@UseGuards(JwtGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  // 获取所有用户 
  @Get('list')
  getAllUsers(@Query() queryDto: GetUserDto) {
    console.log(queryDto)
    return this.userService.findAll(queryDto)
  }
}
