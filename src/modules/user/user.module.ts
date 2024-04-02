import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';
import { RoleService } from '../role/role.service';
import { DepartmentService } from '../department/department.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController, BaseController],
  providers: [UserService, BaseService, RoleService, DepartmentService],
  exports: [UserService],
})
export class UserModule {}
