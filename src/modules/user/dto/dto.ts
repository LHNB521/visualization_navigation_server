import {
  Allow,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class Profile {
  @IsString()
  @IsNotEmpty({ message: '昵称不能为空' })
  @Length(2, 20, {
    message: `昵称长度必须大于$constraint1到$constraint2之间，当前传递的值是$value`,
  })
  nickName: string;

  @Allow()
  gender?: number;
  @Allow()
  avatar?: string;
  @Allow()
  address?: string;
  @Allow()
  email?: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(2, 20, {
    message: `用户名长度必须大于$constraint1到$constraint2之间，当前传递的值是$value`,
  })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { message: `密码长度必须大于$constraint1到$constraint2之间` })
  password: string;

  @IsNotEmpty()
  profile: Profile;

  @IsBoolean()
  @IsOptional()
  enable?: boolean;

  @IsOptional()
  @IsArray()
  roleIds?: number[];
}

export class GetUserDto {
  @Allow()
  nickname?: string;

  @Allow()
  pageSize?: number;

  @Allow()
  pageNum?: number;

  @Allow()
  username?: string;

  @Allow()
  gender?: number;

  @Allow()
  role?: number;

  @Allow()
  enable?: boolean;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { message: `密码长度必须大于$constraint1到$constraint2之间` })
  password: string;
}
