import { JwtGuard, PreviewGuard, RoleGuard } from '@/common/guards';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, GetRolesDto } from './dto';
import { Roles } from '@/common/decorators/roles.decorator';

@Controller('role')
@UseGuards(JwtGuard, RoleGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  create(@Body() creteRoleDto: CreateRoleDto) {
    console.log(creteRoleDto);
    return this.roleService.create(creteRoleDto);
  }

  @Get('list')
  findAll(@Query() query: GetRolesDto) {
    return this.roleService.findAll(query);
  }
}
