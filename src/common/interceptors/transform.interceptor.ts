import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { ReturnType } from '@/types';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const returnType = this.reflector.get<ReturnType>('returnType', context.getHandler());
    const req: any = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => {
        switch (returnType) {
          case 'primitive':
            data.originalUrl = req.originalUrl;
            return data;
          default:
            return {
              code: 200,
              message: null,
              data: data,
              originalUrl: req.originalUrl,
              success: true,
            };
        }
      }),
    );
  }
}
