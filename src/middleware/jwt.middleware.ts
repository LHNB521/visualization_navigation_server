import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '@/modules/auth/auth.constant';
import { tokenError } from '../common/exceptions/custom.exception';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decodedToken: any = jwt.verify(token, jwtConstants.secret);
        req.user = {
          userId: decodedToken.userId,
          username: decodedToken.username,
          currentRoleCode: decodedToken.currentRoleCode,
        };
      } catch (error) {
        throw new tokenError('token过期或token错误，请重新登录');
      }
    }
    next();
  }
}
