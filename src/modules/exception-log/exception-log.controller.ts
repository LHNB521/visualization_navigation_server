import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExceptionLogService } from './exception-log.service';
import { Result } from '@/common/result';
import { ExceptionLog } from './entities/exception-log.entity';

@Controller('exception-log')
export class ExceptionLogController {
  constructor(private readonly exceptionLogService: ExceptionLogService) {}

  // 创建异常日志
  @Post('create')
  async create(@Body() exceptionLog: ExceptionLog) {
    return new Result(await this.exceptionLogService.create(exceptionLog));
  }

  // 获取异常日志列表
  @Get()
  async findAll() {
    return new Result(await this.exceptionLogService.findAll());
  }
}
