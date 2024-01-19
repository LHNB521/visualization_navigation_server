import { JwtGuard, PreviewGuard, RoleGuard } from '@/common/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RoleService } from './role.service';
import {
  AddRolePermissionsDto,
  AddRoleUsersDto,
  CreateRoleDto,
  GetRolesDto,
  UpdateRoleDto,
} from './dto';
import { Roles } from '@/common/decorators/roles.decorator';

@Controller('role')
@UseGuards(JwtGuard, RoleGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // 创建角色
  @Post('create')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  create(@Body() creteRoleDto: CreateRoleDto) {
    return this.roleService.create(creteRoleDto);
  }

  // 获取角色列表
  @Get('list')
  findAll(@Query() query: GetRolesDto) {
    return this.roleService.findAll(query);
  }

  // 根据id修改角色
  @Patch('update/:id')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  // 根据id删除角色
  @Delete('delete/:id')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  delete(@Param('id') id: string) {
    return this.roleService.delete(+id);
  }

  // 给角色分配用户
  @Patch('users/add/:roleId')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  addRoleUsers(@Param('roleId') roleId: string, @Body() dto: AddRoleUsersDto) {
    return this.roleService.addRoleUsers(+roleId, dto);
  }
  // 取消用户角色
  @Patch('users/remove/:roleId')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  removeRoleUsers(@Param('roleId') roleId: string, @Body() dto: AddRoleUsersDto) {
    return this.roleService.removeRoleUsers(+roleId, dto);
  }

  // 根据id获取角色
  @Get('findeOne/:id')
  @Roles('SUPER_ADMIN')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  // 获取角色权限
  @Get('permissions')
  findRolePermissions(@Query('id') id: number) {
    return this.roleService.findRolePermissions(+id);
  }

  // 添加角色权限
  @Post('permissions/add')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  addRolePermissions(@Body() dto: AddRolePermissionsDto) {
    return this.roleService.addRolePermissions(dto);
  }

  // 获取角色权限树
  @Get('permissions/tree')
  findRolePermissionsTree(@Request() req: any) {
    return this.roleService.findRolePermissionsTree(req.user.currentRoleCode);
  }
}
