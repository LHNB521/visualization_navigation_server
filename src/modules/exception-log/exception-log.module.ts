import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Share } from '@/utils/share';
import { ExceptionLog } from './entities/exception-log.entity';
import { ExceptionLogController } from './exception-log.controller';
import { ExceptionLogService } from './exception-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExceptionLog]), Share],
  controllers: [ExceptionLogController],
  providers: [ExceptionLogService],
  exports: [ExceptionLogService],
})
export class ExceptionLogModule {}
