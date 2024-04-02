import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionService } from './permission.service';

@ApiTags('权限管理')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
}
