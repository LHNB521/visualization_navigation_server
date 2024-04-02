import { PaginationDto } from '@/common/dtos/pagination.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// 登录
export class LoginDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  password: string;
}

// 分页
export class PageQueryDto extends PaginationDto {
  @ApiPropertyOptional({ description: '用户名' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({ description: '姓名' })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiPropertyOptional({ description: '状态' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: '部门ID' })
  @IsString()
  @IsOptional()
  departmentId?: string;

  @ApiPropertyOptional({ description: '角色ID' })
  @IsString()
  @IsOptional()
  roleId?: string;
}
