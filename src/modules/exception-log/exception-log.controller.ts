import { Controller, Get } from '@nestjs/common';
import { ExceptionLogService } from './exception-log.service';
import { Result } from '@/common/result/result';

@Controller('exception-log')
export class ExceptionLogController {
  constructor(private readonly exceptionLogService: ExceptionLogService) {}

  // 获取异常日志列表
  @Get()
  async findAll() {
    return new Result(await this.exceptionLogService.findAll());
  }
}
