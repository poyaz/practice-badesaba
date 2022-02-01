import * as crypto from 'crypto';
import {UsersModel} from '../../../../core/model/usersModel';
import {UpdateUserDto} from '../dto/update-user.dto';

export class UpdateUserInputModel {
  getModel(id: string, body: UpdateUserDto) {
    const model = new UsersModel();
    model.id = id;
    model.email = null;
    model.name = body.name;
    model.family = body.family;
    model.age = body.age;
    model.info = body.info;

    return model;
  }
}
