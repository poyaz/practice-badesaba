import * as crypto from 'crypto';
import {AddUserDto} from '../dto/add-user.dto';
import {UsersModel} from '../../../../core/model/usersModel';

export class AddUserInputModel {
  getModel(body: AddUserDto) {
    const model = new UsersModel();
    model.username = body.username;
    model.password = crypto.createHash('sha1').update(body.password).digest('base64');
    model.name = body.name;
    model.family = body.family;
    model.age = body.age;
    model.info = body.info;

    return model;
  }
}
