import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@/shared/shared.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { PermissionModule } from '@/modules/permission/permission.module';
import { RoleModule } from '@/modules/role/role.module';
import Configuration from './config/configuration';
import { handleEnvFilePath, handleValidationSchema } from './utils/env';
// import { ExceptionLogModule } from '@/modules/exception-log/exception-log.module';
import { RedisModule } from '@/modules/redis/redis.module';
@Module({
  imports: [
    // 配置文件模块
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: handleEnvFilePath(),
      load: [Configuration],
      validationSchema: handleValidationSchema(),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    // 共享数据库+Redis模块
    SharedModule,
    RoleModule,
    PermissionModule,
    UserModule,
    AuthModule,
    // Redis模块
    RedisModule,
    // 异常日志模块
    // ExceptionLogModule,
  ],
})
export class AppModule {}
