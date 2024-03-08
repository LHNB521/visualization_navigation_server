import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from '@/modules/user/user.service';
import { RedisService } from '@/modules/redis/redis.service';
import { RoleMenuService } from '../role-menu/role-menu.service';
import { RoleResourceService } from '../role-resource/role-resource.service';
import { MenuService } from '../menu/menu.service';
import getMenuList from '@/utils/getMenuList';
import { ResourceService } from '../resource/resource.service';
import { loginError } from '@/common/exceptions/custom.exception';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
    private readonly roleMenuService: RoleMenuService,
    private readonly roleResourceService: RoleResourceService,
    private readonly menuService: MenuService,
    private readonly resourceService: ResourceService,
  ) {}

  // 登录
  async login(username: string, password: string) {
    // 判断用户是否存在
    const userinfo: any = await this.userService.isExistUser(username);
    // 判断密码是否一致
    const flag = await compare(password, userinfo.password);

    if (userinfo && flag) {
      // 获取菜单
      const { menu, resource } = await this.getPermission(userinfo.userRole.id);
      const roleId = userinfo.userRole.id;
      const permission = {
        roleId,
        resource,
      };
      this.redisService.setValue(`user:${userinfo.id}`, JSON.stringify(permission));
      // 生成token此时请求就带有token了
      const token = this.jwtService.sign({
        username: userinfo.username,
        userId: userinfo.id,
        currentRoleCode: userinfo?.userRole?.code,
      });
      console.log(userinfo.username, userinfo.id, userinfo?.userRole?.code);
      delete userinfo.password;
      userinfo.menus = menu;
      return { userinfo, token };
    }
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

  async logout(user: any) {
    if (user.userId) {
      await Promise.all([this.redisService.delValue(`user:${user.userId}`)]);
      return true;
    }
    return false;
  }
}
