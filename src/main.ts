import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    // session缓存
    session({
      secret: 'lh',
      name: 'lh.session',
      rolling: true,
      cookie: { maxAge: null } as any,
      resave: false,
      saveUninitialized: true,
    })
  )
  await app.listen(3000);
  console.log('🚀 启动成功: http://localhost:3000');
}
bootstrap();
