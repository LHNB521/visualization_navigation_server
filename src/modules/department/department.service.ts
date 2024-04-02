import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ListQueryDto } from './dto/request.dto';
import { UtilsService } from '../shared/utils.service';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}
  /**
   * 通过id获取部门信息
   * @param {number} id
   */
  async getDeptById(id: number) {
    return await this.prisma.department.findFirst({
      where: {
        AND: [{ id }, { isDelete: false }],
      },
    });
  }

  /**
   * 获取部门列表
   * @param {ListQueryDto} query
   */
  async getDeptList(query?: ListQueryDto) {
    return await this.prisma.department.findMany({
      where: {
        AND: [
          {
            name: this.utils.isEmpty(query?.name) ? undefined : { contains: query.name },
          },
          { isDelete: false },
        ],
      },
      orderBy: [{ sort: 'asc' }, { updateTime: 'desc' }],
    });
  }
}
