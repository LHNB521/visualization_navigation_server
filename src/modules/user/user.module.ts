import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Share } from '@/utils/share';
import { RoleMenuModule } from '../role-menu/role-menu.module';
import { MenuModule } from '../menu/menu.module';
@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleMenuModule, MenuModule, Share],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
