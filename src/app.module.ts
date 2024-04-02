import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RedisModule } from '@/modules/redis/redis.module';
import Configuration from './config/configuration';
import { SharedModule } from './modules/shared/shared.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt.auth.guard';
import { PermissionAuthGuard } from './common/guards/permissions.auth.guard';
import { UserModule } from './modules/user/user.module';
// import { AuthModule } from '@/modules/auth/auth.module';
// import { UserModule } from '@/modules/user/user.module';
// import { RoleModule } from '@/modules/role/role.module';
// import { handleEnvFilePath, handleValidationSchema } from './utils/env';
// import { ExceptionLogModule } from '@/modules/exception-log/exception-log.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtMiddleware } from './middleware/jwt.middleware';
// import { LoggerMiddleware } from './middleware/logger.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [Configuration],
    }),
    PrismaModule,
    RedisModule,
    SharedModule,
    UserModule,
    // RoleModule,
    // AuthModule,
    // // 异常日志模块
    // ExceptionLogModule,
  ],
  providers: [
    {
      // JWT身份验证
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      // 权限验证
      provide: APP_GUARD,
      useClass: PermissionAuthGuard,
    },
  ],
})
export class AppModule {}
