import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware'; // 日志收集中间件
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  //日志相关
  app.use(logger); // 所有请求都打印日志
  // 允许跨域
  app.enableCors();

  // session缓存
  app.use(
    session({
      secret: 'lh',
      name: 'lh.session',
      rolling: true,
      cookie: { maxAge: null } as any,
      resave: false,
      saveUninitialized: true,
    }),
  );

  // swagger文档
  const config = new DocumentBuilder()
    .setTitle('四维可视化平台')
    .setDescription('四维可视化平台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(8765);
  console.log(`🚀 启动成功: http://localhost:8765`);
}
bootstrap();
