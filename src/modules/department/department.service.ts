import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { UtilsService } from '../shared/utils.service';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly utils: UtilsService,
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
}
