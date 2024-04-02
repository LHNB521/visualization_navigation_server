import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
// import { Share } from '@/utils/share';
// import { RoleMenuModule } from '../role-menu/role-menu.module';
// import { MenuModule } from '../menu/menu.module';
import { AuthModule } from '../auth/auth.module';
import { BaseController } from './base.controller';
@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController, BaseController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
