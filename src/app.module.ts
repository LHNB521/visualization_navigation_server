import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@/shared/shared.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { PermissionModule } from '@/modules/permission/permission.module';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;
@Module({
  imports: [
    // 配置文件模块
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      // validationSchema: Joi.object({
      //   NODE_ENV: Joi.string().valid('development', 'production').default('development'),
      //   DB_TYPE: Joi.string().valid('postgres'),
      //   DB_HOST: Joi.string().ip(),
      //   DB_PORT: Joi.number().default(5432),
      //   DB_USERNAME: Joi.string().required(),
      //   DB_PASSWORD: Joi.string().required(),
      //   DB_DATABASE: Joi.string().required(),
      //   DB_SYNC: Joi.boolean().default(false),
      // }),
    }),
    // 共享数据库+Redis模块
    SharedModule,

    PermissionModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
