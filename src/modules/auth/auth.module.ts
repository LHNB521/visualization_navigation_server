import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { RedisModule } from '../redis/redis.module';
import { jwtConstants } from './constants';
import { RoleMenuModule } from '../role-menu/role-menu.module';
import { RoleResourceModule } from '../role-resource/role-resource.module';
import { MenuModule } from '../menu/menu.module';
import { ResourceModule } from '../resource/resource.module';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    UserModule,
    PassportModule,
    RedisModule,
    RoleMenuModule,
    RoleResourceModule,
    MenuModule,
    ResourceModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
