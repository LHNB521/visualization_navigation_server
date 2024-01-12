import { JwtGuard } from '@/common/guards';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';

@UseGuards(JwtGuard)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @Get('list')
  findAll() {
    return this.permissionService.findAll();
  }
}
