import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ApiResultResponse } from 'src/common/decorators/api-result-response.decorator';
import { CurrentUserDto, UserDto } from './dto/response.dto';
import { Permission } from '@/common/decorators/permission.decorator';
import { PaginationPipe } from '@/common/pipes/pagination.pipe';
import { CreateUserDto, PageQueryDto } from './dto/request.dto';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 获取当前系统用户信息
   */
  @ApiOperation({ summary: '获取当前系统用户信息' })
  @ApiResultResponse(CurrentUserDto)
  @Get('/info')
  async getCurrentUserInfo(@Req() req: any): Promise<CurrentUserDto> {
    return await this.userService.getCurrentUserInfo(req.user.userId);
  }

  /**
   * 通过ID获取用户信息
   */
  @ApiOperation({ summary: '通过ID获取用户信息' })
  @ApiParam({ name: 'id', description: 'ID' })
  @ApiResultResponse(UserDto)
  @Get(':id')
  @Permission('system:user:query')
  async getUserDetailById(@Param('id') id: number): Promise<UserDto> {
    return await this.userService.getUserDetailById(id);
  }
  /**
   * 创建用户
   * @param {CreateUserDto} createUserDto
   */
  @ApiOperation({ summary: '创建用户' })
  @ApiResultResponse()
  @Post()
  @Permission('system:user:add')
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);
  }
  /**
   * 分页获取用户列表
   */
  // @ApiOperation({ summary: '分页获取用户列表' })
  // @ApiResultResponse(UserDto, { isPage: true })
  // @Get('/list')
  // @Permission('system:user:query')
  // @UsePipes(PaginationPipe)
  // async getUserListByPage(@Query() query: PageQueryDto): Promise<PaginatedDto<UserDto>> {
  //   return await this.userService.getUserListByPage(query);
  // }
}
