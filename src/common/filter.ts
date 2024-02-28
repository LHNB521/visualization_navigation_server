// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { ExceptionLog } from '../api/exception-log/entities/exception-log.entity';
// import objectToString from '../utils/objectToString';

// @Catch(HttpException)
// @Injectable()
// export class HttpFilter implements ExceptionFilter {
//   async catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const request = ctx.getRequest<Request>();
//     const response = ctx.getResponse<Response>();
//     const status = exception.getStatus();
//     const message: string | object = exception.getResponse().valueOf();
//     const path = request.url;

//     const exceptionLog = new ExceptionLog();
//     exceptionLog.optUri = path;
//     exceptionLog.optMethod = request.method;
//     exceptionLog.exceptionInfo = typeof message == 'object' ? JSON.stringify(message) : message;
//     exceptionLog.ipAddress = request.ip.replace('::ffff:', '');
//     exceptionLog.requestParam = objectToString(request.params);

//     response.status(status).json({
//       success: false,
//       time: new Date(),
//       data: message,
//       message,
//       status,
//       path,
//     });
//   }
// }
