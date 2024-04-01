import { ApiProperty } from '@nestjs/swagger';
import { SexEnum, StatusEnum } from '../utils';

export class UserDto {
  @ApiProperty({ description: 'ID' })
  id: number;

  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '姓名' })
  nickname: string;

  @ApiProperty({ description: '电话号码' })
  phoneNumber: string;

  @ApiProperty({ description: '性别', enum: SexEnum })
  sex: SexEnum;

  @ApiProperty({ description: '状态', enum: StatusEnum })
  status: StatusEnum;

  // @ApiProperty({ description: '部门信息' })
  // department: DeptDto;

  // @ApiProperty({
  //   description: '角色信息',
  //   type: 'array',
  //   items: { $ref: getSchemaPath(RoleDto) },
  // })
  // roles: RoleDto;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @ApiProperty({ description: '编辑时间' })
  updateTime: Date;
}
