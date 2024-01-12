import { IsOptional } from 'class-validator';

export class GetRolesDto {
  @IsOptional()
  enable?: boolean;
}
