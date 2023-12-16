import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {SharedModule} from '@/shared/shared.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    // 配置文件模块
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // 共享数据库+Redis模块
    SharedModule,

    UserModule,
    AuthModule
  ],
})
export class AppModule {}
