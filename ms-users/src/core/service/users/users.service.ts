import {Injectable} from '@nestjs/common';
import {IUsersService} from "../../interface/i-users-service.interface";
import {UsersModel} from "../../model/usersModel";

@Injectable()
export class UsersService implements IUsersService {
  add(model: UsersModel): Promise<(Error | UsersModel)[]> {
    return Promise.resolve([]);
  }

  delete(id: string): Promise<Error[]> {
    return Promise.resolve([]);
  }

  getAll(): Promise<(Error | UsersModel[])[]> {
    return Promise.resolve([]);
  }

  getById(id: string): Promise<(Error | UsersModel)[]> {
    return Promise.resolve([]);
  }

  update(model: UsersModel): Promise<Error[]> {
    return Promise.resolve([]);
  }
}
