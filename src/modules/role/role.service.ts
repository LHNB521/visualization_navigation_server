import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '../shared/utils.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}
}
