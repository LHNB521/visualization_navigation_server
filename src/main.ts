import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware'; // 日志收集中间件
import { ExceptionLogService } from '@/modules/exception-log/exception-log.service';
import { HttpFilter } from './common/filter';
import { Response } from './common/response';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 解析来自客户端的 JSON 格式的请求体数据
  app.use(express.json());
  // 是解析客户端发送的 URL 编码（URL-encoded）请求体数据
  app.use(express.urlencoded({ extended: true }));

  //日志相关
  app.use(logger); // 所有请求都打印日志

  // 允许跨域
  app.enableCors();

  // 异常处理
  const exceptionLogService = app.get(ExceptionLogService);
  app.useGlobalFilters(new HttpFilter(exceptionLogService));

  // 响应拦截器
  app.useGlobalInterceptors(new Response());

  // 用于自动验证所有控制器方法的输入参数，确保传入的数据符合预期的结构和规则。
  app.useGlobalPipes(new ValidationPipe());

  // helmet头部安全
  app.use(helmet());
  // rateLimit限流
  app.use(
    rateLimit({
      windowMs: 60 * 1000, //1分钟
      max: 100, //允许每个ip在这windows时间里请求的次数
      handler: (req, res, next) => {
        const httpFilter: any = new HttpFilter(exceptionLogService);
        httpFilter.catch(new HttpException('当前请求过多，请稍后重试', 429), {
          switchToHttp: () => ({
            getRequest: () => req,
            getResponse: () => res,
          }),
        });
      },
    }),
  );

  // session缓存
  app.use(
    session({
      secret: 'lh',
      resave: false,
      saveUninitialized: false,
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
