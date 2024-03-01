import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { hashSync } from 'bcryptjs';
import { GetUserDto, CreateUserDto } from './dto/dto';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import { Role } from '../role/role.entity';
import { RoleMenuService } from '../role-menu/role-menu.service';
import { MenuService } from '../menu/menu.service';
import getMenuList from '@/utils/getMenuList';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleMenuService: RoleMenuService,
    private readonly menuService: MenuService,
    // @InjectRepository(Role)
    // private roleRepo: Repository<Role>,
  ) {}

  // 创建用户
  async create(user: CreateUserDto) {
    const { username } = user;
    const existUser = await this.findByUsername(username);
    // 判断用户是否存在
    // if (existUser) {
    //   throw new CustomException(ErrorCode.ERR_10001);
    // }

    const newUser = this.userRepository.create(user);
    // 判断角色是否存在
    // if (user.roleIds !== undefined) {
    //   newUser.roles = await this.roleRepo.find({
    //     where: { id: In(user.roleIds) },
    //   });
    // }

    // if (!newUser.profile) {
    //   newUser.profile = this.profileRep.create();
    // }

    newUser.password = hashSync(newUser.password);
    await this.userRepository.save(newUser);

    return true;
  }

  // 删除用户
  async remove(id: number) {
    // 不能删除的用户
    if (id == 1) throw new CustomException(ErrorCode.ERR_11006, '不能删除根用户');

    // 删除用户表
    await this.userRepository.delete(id);

    // 删除用户信息表
    // await this.profileRep
    //   .createQueryBuilder('profile')
    //   .delete()
    //   .where('userId = :id', { id })
    //   .execute();

    return true;
  }

  // 根据查询所有用户信息
  async findAll(query: GetUserDto) {
    // const pageSize = query.pageSize || 10;
    // const pageNum = query.pageNum || 1;
    // const [users, total] = await this.userRepository.findAndCount({
    //   select: {
    //     profile: {
    //       gender: true,
    //       avatar: true,
    //       email: true,
    //       address: true,
    //       nickName: true,
    //     },
    //     roles: true,
    //   },
    //   relations: {
    //     profile: true,
    //     roles: true,
    //   },
    //   where: {
    //     username: Like(`%${query.username || ''}%`),
    //     enable: query.enable || undefined,
    //     profile: {
    //       gender: query.gender || undefined,
    //     },
    //   },
    //   order: {
    //     createTime: 'ASC',
    //   },
    //   take: pageSize,
    //   skip: (pageNum - 1) * pageSize,
    // });
    // const rows = users.map((item: any) => {
    //   const newItem = {
    //     ...item,
    //     ...item.profile,
    //   };
    //   delete newItem.profile;
    //   return newItem;
    // });
    // return { rows, total };
  }

  // 根据用户id查询用户详情
  async findUserDetail(id: number) {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.userRole', 'role')
      .addSelect(['role.id', 'role.name', 'role.code'])
      .where('user.id=:id', { id })
      .getOne();
    const roleId = data.userRole.id;
    const menuIds = await this.roleMenuService.findIdByRoleId(roleId);
    const menu = getMenuList(await this.menuService.getMenuByIds(menuIds));
    data.menus = menu;
    console.log(data);
    return { userinfo: data };
  }

  // 根据用户名查询用户信息
  async findByUsername(username: string) {
    // return this.userRepository.findOne({
    //   where: { username },
    //   select: ['id', 'username', 'password', 'enable'],
    //   relations: {
    //     profile: true,
    //     roles: true,
    //   },
    // });
  }

  // 是否存在用户
  async isExistUser(username: string) {
    const res = await this.userRepository
      .createQueryBuilder('userinfo')
      .select()
      .addSelect('userinfo.password')
      .leftJoin('userinfo.userRole', 'role')
      .addSelect(['role.id', 'role.code', 'role.name'])
      .where('userinfo.username = :username', { username })
      .getOne();
    return res;
  }

  // 重置密码
  async resetPassword(id: number, password: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    user.password = hashSync(password);
    await this.userRepository.save(user);
    return true;
  }
}
