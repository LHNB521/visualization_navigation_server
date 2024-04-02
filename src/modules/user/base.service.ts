import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BaseService {
  constructor(private readonly authService: AuthService) {}

  /**
   * 登录
   * @param {User} user
   */
  async login(user: Prisma.UserSelect) {
    const payload = { userId: user.id };
    return this.authService.generateToken(payload);
  }
  /**
   * 登出
   * @param {number} userId
   */
  async logout(userId: number) {
    return this.authService.removeToken(userId);
  }
}
