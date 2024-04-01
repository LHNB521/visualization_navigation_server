import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UtilsService } from './utils.service';
// import { BcryptService } from './bcrypt.service';
import { LoggerService } from './logger.service';
// import { LoggerMiddleware } from '@/common/middlewares/logger.middleware';

@Global()
@Module({
  providers: [UtilsService, LoggerService],
  exports: [UtilsService, LoggerService],
})
export class SharedModule {}
