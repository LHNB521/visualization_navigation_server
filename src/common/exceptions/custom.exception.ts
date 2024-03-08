import { HttpException, HttpStatus } from '@nestjs/common';
import * as ErrorCode from './error-code';

type ErrorType = (typeof ErrorCode)[keyof typeof ErrorCode];

export class CustomException extends HttpException {
  constructor(errorCode: ErrorType, message?: string, status?: HttpStatus) {
    message = message ?? errorCode;
    super(message, status ?? HttpStatus.BAD_REQUEST);
  }
}

export class loginError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class registerError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class tokenError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.EXPECTATION_FAILED);
  }
}

export class resourcePermission extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export { ErrorCode };
