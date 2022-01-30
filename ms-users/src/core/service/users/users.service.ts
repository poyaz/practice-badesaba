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

  async add(model: UsersModel): Promise<(Error | UsersModel)[]> {
    return this._usersRepository.add(model);
  }

  async delete(id: string): Promise<Error[]> {
    const [existError] = await this.getById(id);
    if (existError) {
      return [existError as Error];
    }

    return this._usersRepository.delete(id);
  }

  async getAll(): Promise<(Error | UsersModel[])[]> {
    return this._usersRepository.getAll();
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

  async update(model: UsersModel): Promise<Error[]> {
    const [existError] = await this.getById(model.id);
    if (existError) {
      return [existError as Error];
    }

    return this._usersRepository.update(model);
  }
}
