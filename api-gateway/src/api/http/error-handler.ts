import {HttpException, HttpStatus} from '@nestjs/common';

export enum ExceptionEnum {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  EXIST_ERROR = 'EXIST_ERROR',
  MODEL_ID_NOT_EXIST_ERROR = 'MODEL_ID_NOT_EXIST_ERROR',
}

export class ErrorHandler {
  static throwError(error: Error) {
    let statusCode: number;

    if (error['response']) {
      const e = error['response'];

      throw new HttpException({
        statusCode: error['status'],
        message: e.message,
        error: e.error,
      }, e.statusCode);
    }

    switch (error.name) {
      case ExceptionEnum.UNKNOWN_ERROR:
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      case ExceptionEnum.NOT_FOUND_ERROR:
      case ExceptionEnum.MODEL_ID_NOT_EXIST_ERROR:
        statusCode = HttpStatus.NOT_FOUND;
        break;
      default:
        statusCode = HttpStatus.BAD_REQUEST;
    }

    throw new HttpException({
      status: statusCode,
      error: error['error'] || error.message,
      name: error.name,
    }, statusCode);
  }
}
