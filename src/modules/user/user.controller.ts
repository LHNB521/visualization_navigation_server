import {Controller} from '@nestjs/common';
import { UserService } from './user.service';

import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
}
