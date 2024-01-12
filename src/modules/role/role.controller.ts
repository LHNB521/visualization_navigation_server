import { JwtGuard, RoleGuard } from '@/common/guards';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { GetRolesDto } from './dto';

@Controller('role')
@UseGuards(JwtGuard, RoleGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('list')
  findAll(@Query() query: GetRolesDto) {
    return this.roleService.findAll(query);
  }
}
