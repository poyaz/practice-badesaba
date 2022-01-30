import * as crypto from 'crypto';
import {UsersModel} from '../../../../core/model/usersModel';
import {ChangePasswordUserDto} from '../dto/change-password-user.dto';

export class ChangePasswordUserInputModel {
  getModel(id: string, body: ChangePasswordUserDto) {
    const model = new UsersModel();
    model.id = id;
    model.password = crypto.createHash('sha1').update(body.password).digest('base64');

    return model;
  }
}
