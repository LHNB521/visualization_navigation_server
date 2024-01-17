import { JwtGuard, PreviewGuard, RoleGuard } from '@/common/guards';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, GetRolesDto, UpdateRoleDto } from './dto';
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
    console.log(creteRoleDto);
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
}
