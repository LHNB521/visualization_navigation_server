import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor.ts';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerService } from './modules/shared/logger.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // api前缀
  app.setGlobalPrefix('api');
  // 全局注册，统一响应格式
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 原始类型的转换，如string转化为number
      whitelist: true, // 不会接受dto定义以外的属性
      // forbidNonWhitelisted: true, // 如果传入dto定义以外的属性，服务端则会报400错
    }),
  );

  // execption，报错过滤器
  app.useGlobalFilters(new HttpExceptionFilter(new LoggerService()));

  // 跨域
  app.enableCors();

  // swagger文档
  const config = new DocumentBuilder()
    .setTitle('admin')
    .setDescription('admin接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(8765);
  console.log(`🚀 启动成功: http://localhost:8765`);
}
bootstrap();
