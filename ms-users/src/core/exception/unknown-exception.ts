import {ExceptionEnum} from "../enum/exceptionEnum";

export class UnknownException extends Error {
  readonly isOperation: boolean;

  constructor() {
    super('Unknown Error happened!');

    this.name = ExceptionEnum.UNKNOWN_ERROR;
    this.isOperation = true;
  }
}
