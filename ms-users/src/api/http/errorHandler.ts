import {ExceptionEnum} from '../../core/enum/exceptionEnum';
import {HttpException, HttpStatus} from '@nestjs/common';

export class ErrorHandler {
  static throwError(error: Error) {
    let statusCode: number;

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
      error: error.message,
    }, statusCode);
  }
}
