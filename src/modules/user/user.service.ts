import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository, Like } from 'typeorm';
import { User } from './user.entity';
import { hashSync } from "bcryptjs";
import { GetUserDto, CreateUserDto } from "./dto";
import { CustomException, ErrorCode } from "@/common/exceptions/custom.exception";
import { Role } from "../role/role.entity";
import { Profile } from "./profile.entity";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Profile)
    private profileRep: Repository<Profile>,
  ) { }

  // 创建用户
  async create(user: CreateUserDto) {
    const { username } = user
    console.log(user, CreateUserDto)
    const existUser = await this.findByUsername(username)
    // 判断用户是否存在
    if (existUser) {
      throw new CustomException(ErrorCode.ERR_10001)
    }

    const newUser = this.userRep.create(user)
    // 判断角色是否存在
    if (user.roleIds !== undefined) {
      newUser.roles = await this.roleRepo.find({
        where: { id: In(user.roleIds) }
      })
    }

    if(!newUser.profile){
      newUser.profile = this.profileRep.create()
    }

    newUser.password = hashSync(newUser.password)
    await this.userRep.save(newUser)
    
    console.log(newUser)
    return true
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