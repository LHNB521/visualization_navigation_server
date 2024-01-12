import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Permission } from '../permission/permission.entity';
import { User } from '../user/user.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, User])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
