import { Exclude } from 'class-transformer';
import { Allow, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: '角色编码不能为空' })
  code: string;

  @IsNotEmpty({ message: '角色名不能为空' })
  name: string;

  @IsOptional()
  @IsArray()
  permissionIds: number[];

  @IsBoolean()
  @IsOptional()
  enable?: boolean;
}

export class GetRolesDto {
  @Allow()
  pageSize?: number;

  @Allow()
  pageNum?: number;

  @Allow()
  name?: string;

  @Allow()
  enable?: boolean;
}

export class UpdateRoleDto {
  @Exclude()
  code: string;

  @IsOptional()
  name: string;

  @IsOptional()
  @IsArray()
  permissionIds?: number[];

  @IsBoolean()
  @IsOptional()
  enable?: boolean;
}

export class AddRoleUsersDto {
  @IsArray()
  userIds: number[];
}

export class AddRolePermissionsDto {
  @IsNumber()
  id: number;

  @IsArray()
  permissionIds: number[];
}
