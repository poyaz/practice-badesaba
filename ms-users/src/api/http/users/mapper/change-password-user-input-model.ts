import * as crypto from 'crypto';
import {UsersModel} from '../../../../core/model/usersModel';
import {ChangePasswordUserDto} from '../dto/change-password-user.dto';

export class ChangePasswordUserInputModel {
  getModel(id: string, body: ChangePasswordUserDto) {
    const model = new UsersModel();
    model.id = id;
    model.email = null;
    model.name = null;
    model.family = null;
    model.age = null;
    model.info = null;

    return model;
  }
}
