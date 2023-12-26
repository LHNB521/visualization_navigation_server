import { Allow } from "class-validator";


export class GetUserDto {
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