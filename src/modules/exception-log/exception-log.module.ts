import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionLog } from './entities/exception-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExceptionLog])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ExceptionLogModule {}
