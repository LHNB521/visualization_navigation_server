import { Injectable } from '@nestjs/common';
import { UtilsService } from '../shared/utils.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}
}
