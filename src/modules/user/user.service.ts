import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { omit } from 'lodash';
import { RoleService } from '../role/role.service';

// import { InjectRepository } from '@nestjs/typeorm';
// import { In, Repository, Like } from 'typeorm';
// import { User } from './entities/user.entity';
// import { hashSync } from 'bcryptjs';
// import { GetUserDto, CreateUserDto } from './dto/dto';
// import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
// import { Role } from '../role/role.entity';
// import { RoleMenuService } from '../role-menu/role-menu.service';
// import { MenuService } from '../menu/menu.service';
// import getMenuList from '@/utils/getMenuList';
// import { PageQueryDto } from './dto/request.dto';
// import { UtilsService } from '../shared/utils.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly roleService: RoleService,

    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    // private readonly roleMenuService: RoleMenuService,
    // private readonly menuService: MenuService,
    // private readonly utils: UtilsService,
    // @InjectRepository(Role)
    // private roleRepo: Repository<Role>,
  ) {}

  // // 创建用户
  // async create(user: CreateUserDto) {
  //   const { username } = user;
  //   const existUser = await this.findByUsername(username);
  //   // 判断用户是否存在
  //   // if (existUser) {
  //   //   throw new CustomException(ErrorCode.ERR_10001);
  //   // }

  //   const newUser = this.userRepository.create(user);
  //   // 判断角色是否存在
  //   // if (user.roleIds !== undefined) {
  //   //   newUser.roles = await this.roleRepo.find({
  //   //     where: { id: In(user.roleIds) },
  //   //   });
  //   // }

  //   // if (!newUser.profile) {
  //   //   newUser.profile = this.profileRep.create();
  //   // }

  //   newUser.password = hashSync(newUser.password);
  //   await this.userRepository.save(newUser);

  //   return true;
  // }

  // // 删除用户
  // async remove(id: number) {
  //   // 不能删除的用户
  //   if (id == 1) throw new CustomException(ErrorCode.ERR_11006, '不能删除根用户');

  //   // 删除用户表
  //   await this.userRepository.delete(id);

  //   // 删除用户信息表
  //   // await this.profileRep
  //   //   .createQueryBuilder('profile')
  //   //   .delete()
  //   //   .where('userId = :id', { id })
  //   //   .execute();

  //   return true;
  // }

  // // 查询所有用户信息
  // findAll() {
  //   const data = this.userRepository.find();
  //   return data;
  // }

  // // 查询用户
  // async getUserListByPage({
  //   skip,
  //   take,
  //   username = '',
  //   nickname = '',
  //   status = '',
  //   departmentId = '',
  //   roleId = '',
  // }: PageQueryDto = {}) {
  //   // 查询参数
  //   const whereQuery = {
  //     AND: [
  //       {
  //         isDelete: false,
  //       },
  //       {
  //         username: this.utils.isEmpty(username) ? undefined : { contains: username },
  //       },
  //       {
  //         nickname: this.utils.isEmpty(nickname) ? undefined : { contains: nickname },
  //       },
  //       {
  //         status: this.utils.isEmpty(status) ? undefined : parseInt(status),
  //       },
  //       {
  //         userRole: this.utils.isEmpty(roleId) ? undefined : { some: { roleId: parseInt(roleId) } },
  //       },
  //     ],
  //   };

  //   // 部门查询参数
  //   // const deptQuery: any = {
  //   //   departmentId: undefined,
  //   // };
  //   // if (!this.utils.isEmpty(departmentId)) {
  //   //   // 获取所有部门
  //   //   const parseDeptId = parseInt(departmentId);
  //   //   const allDeptList = await this.departmentService.getDeptList();
  //   //   // 获取当前部门所有子孙部门id
  //   //   const childDepartmentIds = [parseDeptId, ...findChildDepartments(parseDeptId, allDeptList)];
  //   //   deptQuery.departmentId = {
  //   //     in: childDepartmentIds,
  //   //   };
  //   // }

  //   // whereQuery.AND.push(deptQuery);

  //   // const users = await this.prisma.user.findMany({
  //   //   take,
  //   //   skip,
  //   //   where: whereQuery,
  //   //   include: {
  //   //     department: true,
  //   //     userRole: {
  //   //       include: {
  //   //         role: true,
  //   //       },
  //   //     },
  //   //   },
  //   //   orderBy: [
  //   //     {
  //   //       createTime: 'desc',
  //   //     },
  //   //   ],
  //   // });

  //   // const list = users.map((item) => {
  //   //   let user: any = Object.assign({}, item);
  //   //   user.roles = (user.userRole || []).map((ur) => ur.role);
  //   //   user = omit(user, ['isDelete', 'userRole', 'password']);
  //   //   return user;
  //   // });

  //   // const count = await this.prisma.user.count({ where: whereQuery });
  //   return {
  //     // list,
  //     // total: count,
  //   };
  // }

  // // 根据用户id查询用户详情
  // async findUserDetail(id: number) {
  //   const data = await this.userRepository
  //     .createQueryBuilder('user')
  //     .leftJoin('user.userRole', 'role')
  //     .addSelect(['role.id', 'role.name', 'role.code'])
  //     .where('user.id=:id', { id })
  //     .getOne();
  //   const roleId = data.userRole.id;
  //   const menuIds = await this.roleMenuService.findIdByRoleId(roleId);
  //   const menu = getMenuList(await this.menuService.getMenuByIds(menuIds));
  //   data.menus = menu;
  //   return { userinfo: data };
  // }

  // // 根据用户名查询用户信息
  // async findByUsername(username: string) {
  //   return this.userRepository.findOne({
  //     where: { username },
  //     select: ['id', 'username', 'password', 'enable'],
  //     relations: {
  //       userRole: true,
  //     },
  //   });
  // }

  // // 是否存在用户
  // async isExistUser(username: string) {
  //   const res = await this.userRepository
  //     .createQueryBuilder('userinfo')
  //     .select()
  //     .addSelect('userinfo.password')
  //     .leftJoin('userinfo.userRole', 'role')
  //     .addSelect(['role.id', 'role.code', 'role.name'])
  //     .where('userinfo.username = :username', { username })
  //     .getOne();
  //   return res;
  // }

  // // 修改密码
  // async resetPassword(id: number, password: string) {
  //   const user = await this.userRepository.findOne({ where: { id } });
  //   user.password = hashSync(password);
  //   await this.userRepository.save(user);
  //   return true;
  // }
  // ---------------------
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
