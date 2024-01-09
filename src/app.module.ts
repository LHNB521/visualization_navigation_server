import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@/shared/shared.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { PermissionModule } from '@/modules/permission/permission.module';
import * as dotenv from 'dotenv';

@Module({
  imports: [
    // 配置文件模块
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [() => dotenv.config({ path: '.env' })],
    }),
    // 共享数据库+Redis模块
    SharedModule,

    PermissionModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
