import { HttpException, HttpStatus } from '@nestjs/common';
import * as ErrorCode from './error-code';

type ErrorType = (typeof ErrorCode)[keyof typeof ErrorCode]

function getErrorCode(errType: ErrorType): number {
  const key = Object.keys(ErrorCode).find(key => ErrorCode[key] === errType);
  return key ? +key.split('_')[1] : -1;
}

export class CustomException extends HttpException {
  protected code: number;
  constructor(errorCode: ErrorType, message?: string, status?: HttpStatus) {
    message = message ?? errorCode;
    super(message, status ?? HttpStatus.BAD_REQUEST);
    this.code = getErrorCode(errorCode);
  }
}
export { ErrorCode }