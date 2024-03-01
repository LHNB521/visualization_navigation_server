import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  // 获取资源
  getResourceByIds(ids: number[]) {
    return this.resourceRepository.findBy({ id: In(ids) });
  }
}
