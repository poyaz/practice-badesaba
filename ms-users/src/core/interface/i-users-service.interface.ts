import {UsersModel} from "../model/usersModel";

export const USERS_SERVICE = 'USERS_SERVICE'

export interface IUsersService {
    getById(id: string): Promise<(Error | UsersModel)[]>;

    getAll(): Promise<(Error | UsersModel[])[]>;

    add(model: UsersModel): Promise<(Error | UsersModel)[]>;

    update(model: UsersModel): Promise<(Error)[]>;

    delete(id: string): Promise<(Error)[]>;
}
