import {ExceptionEnum} from "../enum/exceptionEnum";

export class ModelIdNotExistException extends Error {
  readonly isOperation: boolean;

  constructor() {
    super('Can not found model id. Make sure id has been set in model!');

    this.name = ExceptionEnum.MODEL_ID_NOT_EXIST_ERROR;
    this.isOperation = true;
  }
}
