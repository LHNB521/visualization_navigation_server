import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hashSync } from "bcryptjs";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>
  ) { }

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
  async resetPassword(id: number, password: string) {
    const user = await this.userRep.findOne({ where: { id } })
    user.password = hashSync(password)
    await this.userRep.save(user)
    return true
  }
}