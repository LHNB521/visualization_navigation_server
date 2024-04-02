import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/request.dto';
import { ApiException } from '@/common/exceptions/api-exception';
import { BcryptService } from '../shared/bcrypt.service';
import { UtilsService } from '../shared/utils.service';
import { DepartmentService } from '../department/department.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly departmentService: DepartmentService,
    private readonly bcrypt: BcryptService,
    private readonly utils: UtilsService,
  ) {}

  /**
   * 校验部门信息
   * @param {number} deptId
   */
  async validateDept(deptId: number | string) {
    const dept = await this.departmentService.getDeptById(deptId as number);
    if (!dept) {
      throw new ApiException(`部门信息不存在！`);
    }
    return dept;
  }

  /**
   * 校验角色信息
   * @param {array} roleIds
   */
  async validateRoles(roleIds: number[]) {
    const roles = await this.prisma.role.findMany({
      where: {
        id: {
          in: roleIds,
        },
      },
    });

    // 合法的角色Id数组
    const validRoleIds = roles.map((item) => item.id);
    // 非法的角色Id数组
    const invalidRoleIds = roleIds.filter((item) => !validRoleIds.includes(item));
    if (invalidRoleIds.length > 0) {
      throw new ApiException(`角色信息不存在，ID: ${invalidRoleIds.join(',')}`);
    }
  }

  /**
   * 创建用户
   * @param {CreateUserDto} createUserDto
   */
  async createUser(createUserDto: CreateUserDto) {
    const deptId = createUserDto.departmentId;
    const roleIds = createUserDto.roleId;

    if (createUserDto.password !== createUserDto.confirmPassword)
      throw new ApiException('两次输入密码不一致，请重试！');

    if (await this.getUserByUsername(createUserDto.username))
      throw new ApiException(`用户名已存在！`);

    const userCreateInput: any = {
      id: createUserDto.id, // 初始创建admin用户时需要用到
      username: createUserDto.username,
      nickname: createUserDto.nickname,
      phoneNumber: createUserDto.phoneNumber,
      sex: createUserDto.sex,
      status: createUserDto.status,
      password: '',
    };

    // 加密
    const hashedPwd = await this.bcrypt.hash(createUserDto.password);
    userCreateInput.password = hashedPwd;

    // 校验部门信息
    if (!this.utils.isEmpty(deptId)) {
      await this.validateDept(deptId);
      userCreateInput.department = {
        connect: {
          id: deptId as number,
        },
      };
    }

    // 校验角色信息
    if (!this.utils.isEmpty(roleIds) && roleIds.length !== 0) {
      await this.validateRoles(roleIds);

      userCreateInput.userRole = {
        createMany: {
          data: roleIds.map((item) => {
            return {
              roleId: item,
            };
          }),
        },
      };
    }
    await this.prisma.user.create({
      data: userCreateInput,
    });
  }

  /**
   * 通过id获取用户详细信息
   * @param {Number} id
   */
  async getUserDetailById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      // include: {
      //   department: true,
      //   userRole: {
      //     include: {
      //       role: true,
      //     },
      //   },
      // },
    });
    const detail: any = Object.assign({}, user);
    // detail.roles = (user.userRole || []).map((ur: any) => ur.role);
    // detail = omit(detail, ['isDelete', 'userRole', 'password']);
    return detail;
  }
  /**
   * 获取当前用户信息
   * @param {Number} id 用户id
   */
  async getCurrentUserInfo(id: number) {
    const userInfo = await this.getUserDetailById(id);

    // const roleIds = userInfo.roles.map((item) => item.id);

    // const permissions = await this.roleService.getPermissionsByRoleIds(roleIds || []);

    // const permissionCodes = permissions
    //   .filter((item) => !this.utils.isEmpty(item.code))
    //   .map((item) => item.code);

    // userInfo.permissions = permissionCodes;

    // // 缓存
    // this.redis.set(`${USER_PERMISSION_KEY}:${id}`, JSON.stringify(permissionCodes));

    return userInfo;
  }

  /**
   * 通过username获取用户信息
   * @param {String} username
   */
  async getUserByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  /**
   * 通过id获取用户信息
   * @param {Number} id
   */
  async getUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
