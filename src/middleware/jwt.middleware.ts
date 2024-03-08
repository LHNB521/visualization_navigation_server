import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '@/modules/auth/constants';
import { tokenError } from '../common/exceptions/custom.exception';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (token) {
      try {
        console.log('----------', jwt.verify(token, jwtConstants.secret));
        const decodedToken: any = jwt.verify(token, jwtConstants.secret);
        console.log(decodedToken);
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
