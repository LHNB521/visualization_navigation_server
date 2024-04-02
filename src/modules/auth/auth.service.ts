import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { compare, compareSync } from 'bcryptjs';
import { UserService } from '@/modules/user/user.service';
// import { RedisService } from '@/modules/redis/redis.service';
import { RoleMenuService } from '../role-menu/role-menu.service';
import { RoleResourceService } from '../role-resource/role-resource.service';
import { MenuService } from '../menu/menu.service';
import getMenuList from '@/utils/getMenuList';
import { ResourceService } from '../resource/resource.service';
import { loginError, tokenError } from '@/common/exceptions/custom.exception';
// import { ACCESS_TOKEN_EXPIRATION_TIME } from './auth.constant';
import { ApiException } from '@/common/exceptions/api-exception';
import { BcryptService } from '../shared/bcrypt.service';
import { USER_TOKEN_KEY } from '@/common/constants/redis.contant';
import { RedisService } from '../redis/redis.service';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly bctyptService: BcryptService,
    private readonly redisSerivce: RedisService,
    // private jwtService: JwtService,
    // private redisService: RedisService,
    private readonly roleMenuService: RoleMenuService,
    private readonly roleResourceService: RoleResourceService,
    private readonly menuService: MenuService,
    private readonly resourceService: ResourceService,
  ) {}

  // 登录
  async login(username: string, password: string) {
    // 判断用户是否存在
    // const userinfo: any = await this.userService.isExistUser(username);
    // 判断密码是否一致
    // const flag = await compare(password, userinfo.password);
    // if (userinfo && flag) {
    //   // 获取菜单
    //   const { menu, resource } = await this.getPermission(userinfo.userRole.id);
    //   const roleId = userinfo.userRole.id;
    //   const permission = {
    //     roleId,
    //     resource,
    //   };
    //   this.redisService.setValue(`user:${userinfo.id}`, JSON.stringify(permission));
    //   // 生成token此时请求就带有token了
    //   const token = this.jwtService.sign({
    //     username: userinfo.username,
    //     userId: userinfo.id,
    //     currentRoleCode: userinfo?.userRole?.code,
    //   });
    //   this.redisService.setValue(
    //     `user_access_token:${userinfo.id}`,
    //     token,
    //     ACCESS_TOKEN_EXPIRATION_TIME,
    //   );
    //   delete userinfo.password;
    //   userinfo.menus = menu;
    //   return { userinfo, token };
    // }
    throw new loginError('账号或密码错误');
  }

  // 获取权限
  async getPermission(roleId: number) {
    const menuIds = await this.roleMenuService.findIdByRoleId(roleId);
    const resourceIds = await this.roleResourceService.findIdByRoleId(roleId);
    const list = await this.menuService.getMenuByIds(menuIds);
    const menu = getMenuList(list);
    const resource = await this.resourceService.getResourceByIds(resourceIds);
    return { menu, resource };
  }

  // 登出
  logout(userId: number) {
    if (userId) {
      // this.redisService.delValue(`user_access_token:${userId}`);
      return true;
    }
    return false;
  }

  /**
   * 校验token
   * @param {number} userId 用户id
   * @param {string} token
   * @return {boolean}
   */
  async validateToken(userId: number, token: any) {
    const user = this.userService.getUserById(userId);
    if (!user) {
      throw new ApiException('用户认证失败！', 401);
    }
    const cacheToken = await this.redisSerivce.get(`${USER_TOKEN_KEY}:${userId}`);
    if (!cacheToken || token !== cacheToken) {
      throw new ApiException('登录状态已过期！', 401);
    }
    return true;
  }

  /**
   * 校验用户信息
   * @param {string} username
   * @param {string} password
   * @return {*}
   */
  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user) throw new ApiException('用户不存在！');
    if (!(await this.bctyptService.compare(password, user.password)))
      throw new ApiException('密码错误!');
    return user;
  }

  /**
   * 移除token
   * @param {number} userId
   */
  removeToken(userId: number) {
    this.redisSerivce.del(`${USER_TOKEN_KEY}:${userId}`);
  }

  // 生成token
  generateToken(payload: any) {
    console.log(payload);
  }
}
