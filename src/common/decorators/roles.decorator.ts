import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants/decorator.constant';

// 超级管理员注解
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
