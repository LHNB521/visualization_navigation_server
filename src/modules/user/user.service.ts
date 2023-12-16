import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User)
    // private userReq: Repository<User>
  ) { }

  async findByUsername(username: string) {
    console.log(username)
    // return this.userReq.findOne({
    //   where: { username },
    //   select: ['id', 'username', 'password', 'enable'],
    //   relations: {
    //     profile: true,
    //     roles: true
    //   }
    // })
  }
}