import { JwtGuard } from '@/common/guards';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto';

@UseGuards(JwtGuard)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get('list')
  findAll() {
    return this.permissionService.findAll();
  }
}
