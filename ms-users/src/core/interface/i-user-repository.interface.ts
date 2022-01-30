import {UsersModel} from '../model/usersModel';

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export interface IUserRepositoryInterface {
  getById(id: string): Promise<(Error | UsersModel | null)[]>;

  getAll(): Promise<(Error | UsersModel[])[]>;

  add(model: UsersModel): Promise<(Error | UsersModel)[]>;

  update(model: UsersModel): Promise<(Error)[]>;

  delete(id: string): Promise<(Error)[]>;
}
