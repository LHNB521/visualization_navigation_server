import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {SharedModule} from './shared/shared.module';

@Module({
  imports: [
    // 配置文件模块
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // 共享数据库+Redis模块
    SharedModule
  ],
})
export class AppModule {}
