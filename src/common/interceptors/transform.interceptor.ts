import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, map } from "rxjs";
import { ReturnType } from '@/types';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) { }
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const returnType = this.reflector.get<ReturnType>('returnType', context.getHandler())
    const req: any = context.getArgByIndex(1).req as Request

    return next.handle().pipe(
      map((data) => {
        switch (returnType) {
          case "primitive":
            return data;
          default:
            return {
              code: 0,
              message: 'ok',
              data,
              originalUrl: req.originalUrl,
            }
        }
      })
    )
  }
}