import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, Like } from 'typeorm';
import { User } from './user.entity';
import { hashSync } from 'bcryptjs';
import { GetUserDto, CreateUserDto } from './dto';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import { Role } from '../role/role.entity';
import { Profile } from './profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Profile)
    private profileRep: Repository<Profile>,
  ) {}

  // 创建用户
  async create(user: CreateUserDto) {
    const { username } = user;
    const existUser = await this.findByUsername(username);
    // 判断用户是否存在
    if (existUser) {
      throw new CustomException(ErrorCode.ERR_10001);
    }

    const newUser = this.userRep.create(user);
    // 判断角色是否存在
    if (user.roleIds !== undefined) {
      newUser.roles = await this.roleRepo.find({
        where: { id: In(user.roleIds) },
      });
    }

    if (!newUser.profile) {
      newUser.profile = this.profileRep.create();
    }

    newUser.password = hashSync(newUser.password);
    await this.userRep.save(newUser);

    return true;
  }

  // 删除用户
  async remove(id: number) {
    // 不能删除的用户
    if (id == 1) throw new CustomException(ErrorCode.ERR_11006, '不能删除根用户');

    // 删除用户表
    await this.userRep.delete(id);

    // 删除用户信息表
    await this.profileRep
      .createQueryBuilder('profile')
      .delete()
      .where('userId = :id', { id })
      .execute();

    return true;
  }

  // 根据查询所有用户信息
  async findAll(query: GetUserDto) {
    const pageSize = query.pageSize || 10;
    const pageNum = query.pageNum || 1;
    const [users, total] = await this.userRep.findAndCount({
      select: {
        profile: {
          gender: true,
          avatar: true,
          email: true,
          address: true,
        },
        roles: true,
      },
      relations: {
        profile: true,
        roles: true,
      },
      where: {
        username: Like(`%${query.username || ''}%`),
        enable: query.enable || undefined,
        profile: {
          gender: query.gender || undefined,
        },
      },
      order: {
        createTime: 'ASC',
      },
      take: pageSize,
      skip: (pageNum - 1) * pageSize,
    });
    const pageData = users.map((item: any) => {
      const newItem = {
        ...item,
        ...item.profile,
      };
      delete newItem.profile;
      return newItem;
    });
    return { pageData, total };
  }

  // 根据用户id查询用户详情
  async findUserDetail(id: number, roleCode: string) {
    // 查询用户信息
    const user = await this.userRep.findOne({
      where: { id },
      relations: {
        profile: true,
        roles: true,
      },
    });

    // 查询当前用户角色
    const currentRole = user.roles?.find((item) => item.code === roleCode && item.enable);

    if (!currentRole) {
      throw new CustomException(ErrorCode.ERR_11005, '您目前暂无此角色或已被禁用，请联系管理员');
    }

    return { ...user, currentRole };
  }

  // 根据用户名查询用户信息
  async findByUsername(username: string) {
    return this.userRep.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'enable'],
      relations: {
        profile: true,
        roles: true,
      },
    });
  }

  // 重置密码
  async resetPassword(id: number, password: string) {
    const user = await this.userRep.findOne({ where: { id } });
    user.password = hashSync(password);
    await this.userRep.save(user);
    return true;
  }
}
