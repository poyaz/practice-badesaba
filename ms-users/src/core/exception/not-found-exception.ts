import {ExceptionEnum} from "../enum/exceptionEnum";

export class NotFoundException extends Error {
  readonly isOperation: boolean;

  constructor() {
    super('Your path or object request not found!');

    this.name = ExceptionEnum.NOT_FOUND_ERROR;
    this.isOperation = true;
  }
}
