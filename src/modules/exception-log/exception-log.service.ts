import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionLog } from './entities/exception-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExceptionLogService {
  constructor(
    @InjectRepository(ExceptionLog)
    private readonly exceptionLogRepository: Repository<ExceptionLog>,
  ) {}

  // 创建
  async create(exceptionLog: ExceptionLog) {
    const data = await this.exceptionLogRepository.save(exceptionLog);
    return data;
  }

  // 查询所有
  findAll() {
    const data = this.exceptionLogRepository.find();
    return data;
  }
}
