import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from 'typeorm';
import { User } from './user.entity';
import { hashSync } from "bcryptjs";
import { GetUserDto } from "./dto";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>
  ) { }

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
          gender: query.gender || undefined
        }
      },
      order: {
        createTime: 'ASC'
      },
      take: pageSize,
      skip: (pageNum - 1) * pageSize
    })
    const pageData = users.map((item: any) => {
      const newItem = {
        ...item,
        ...item.profile,
      }
      delete newItem.profile
      return newItem
    })
    return { pageData, total };
  }

  // 根据用户名查询用户信息 
  async findByUsername(username: string) {
    return this.userRep.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'enable'],
      relations: {
        profile: true,
        roles: true
      }
    })
  }

  // 重置密码
  async resetPassword(id: number, password: string) {
    const user = await this.userRep.findOne({ where: { id } })
    user.password = hashSync(password)
    await this.userRep.save(user)
    return true
  }
}