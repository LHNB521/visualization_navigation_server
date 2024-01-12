import { InjectRepository } from '@nestjs/typeorm';
import { GetRolesDto } from './dto';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  async findAll(query: GetRolesDto) {
    console.log(query);
    return this.roleRepo.find({ where: query });
  }
}
