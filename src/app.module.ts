import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@/shared/shared.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { PermissionModule } from '@/modules/permission/permission.module';
import { RoleModule } from '@/modules/role/role.module';
import * as Joi from 'joi';

@Module({
  imports: [
    // 配置文件模块
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().valid('postgres'),
        DB_HOST: Joi.string().default('192.168.1.2'),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().default('postgres'),
        DB_PASSWORD: Joi.string().default('root'),
        DB_DATABASE: Joi.string().default('vis'),
        DB_SYNC: Joi.boolean().default(false),
        REDIS_URL: Joi.string().default('redis://default:123456@192.168.1.2:6379'),
        JWT_SECRET: Joi.string().default('d0!doc15415B0*4G0`'),
      }),
    }),
    // 共享数据库+Redis模块
    SharedModule,

    RoleModule,
    PermissionModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
