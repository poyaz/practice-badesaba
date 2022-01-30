import {Inject, Injectable} from '@nestjs/common';
import {IUsersService} from '../../interface/i-users-service.interface';
import {UsersModel} from '../../model/usersModel';
import {IUserRepositoryInterface, USERS_REPOSITORY} from '../../interface/i-user-repository.interface';
import {NotFoundException} from '../../exception/not-found-exception';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly _usersRepository: IUserRepositoryInterface
  ) {
  }

  add(model: UsersModel): Promise<(Error | UsersModel)[]> {
    return Promise.resolve([]);
  }

  delete(id: string): Promise<Error[]> {
    return Promise.resolve([]);
  }

  getAll(): Promise<(Error | UsersModel[])[]> {
    return Promise.resolve([]);
  }

  async getById(id: string): Promise<(Error | UsersModel)[]> {
    const [error, data] = await this._usersRepository.getById(id);
    if (error) {
      return [error];
    }
    if (!data) {
      return [new NotFoundException()];
    }

    return [null, data];
  }

  update(model: UsersModel): Promise<Error[]> {
    return Promise.resolve([]);
  }
}
