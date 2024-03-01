import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { RoleModule } from '@/modules/role/role.module';
import Configuration from './config/configuration';
import { handleEnvFilePath, handleValidationSchema } from './utils/env';
import { ExceptionLogModule } from '@/modules/exception-log/exception-log.module';
import { RedisModule } from '@/modules/redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';

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
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          host: process.env.DB_HOST || configService.get('DB_HOST'),
          port: +process.env.DB_PORT || configService.get('DB_PORT'),
          username: process.env.DB_USERNAME || configService.get('DB_USERNAME'),
          password: process.env.DB_PASSWORD || configService.get('DB_PASSWORD'),
          database: process.env.DB_DATABASE || configService.get('DB_DATABASE'),
          syncronize: configService.get('DB_SYNC'),
          logging: process.env.NODE_ENV === 'development',
        };
      },
    }),
    RoleModule,
    UserModule,
    AuthModule,
    // Redis模块
    RedisModule,
    // 异常日志模块
    ExceptionLogModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(); //解析请求的token
    consumer.apply(LoggerMiddleware).forRoutes(
      { path: '*', method: RequestMethod.POST },
      {
        path: '*',
        method: RequestMethod.DELETE,
      },
    );
  }
}
