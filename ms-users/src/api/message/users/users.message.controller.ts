import {Controller, Inject, UseFilters, UseInterceptors} from '@nestjs/common';
import {IUsersService, USERS_SERVICE} from '../../../core/interface/i-users-service.interface';
import {MessagePattern} from '@nestjs/microservices';
import {MessageTransformInterceptor} from '../middleware/message-transform.interceptor';
import {GetByIdDto} from './dto/get-by-id.dto';
import {AddUserDto} from './dto/add-user.dto';
import {AddUserInputModel} from '../../http/users/mapper/add-user-input-model';
import {UpdateUserDto} from './dto/update-user.dto';
import {UpdateUserInputModel} from '../../http/users/mapper/update-user-input-model';
import {ErrorMessageFilterFilter} from '../middleware/error-message-filter.filter';
import {UsersModel} from '../../../core/model/usersModel';

@Controller()
@UseFilters(ErrorMessageFilterFilter)
@UseInterceptors(MessageTransformInterceptor)
export class UsersMessageController {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly _usersService: IUsersService
  ) {
  }

  @MessagePattern({cmd: 'users.getById'})
  async getById(data: GetByIdDto): Promise<(Error | UsersModel)[]> {
    return this._usersService.getById(data.id);
  }

  @MessagePattern({cmd: 'users.getAll'})
  async getAll(): Promise<(Error | UsersModel[])[]> {
    return this._usersService.getAll();
  }

  @MessagePattern({cmd: 'users.add'})
  async addUser(body: AddUserDto): Promise<(Error | UsersModel)[]> {
    const addUserInputModel = new AddUserInputModel();
    const model = addUserInputModel.getModel(body);

    return this._usersService.add(model);
  }

  @MessagePattern({cmd: 'users.update'})
  async update(body: UpdateUserDto): Promise<(Error | { result: boolean })[]> {
    const id = body.id;
    delete body.id;

    const updateUserInputModel = new UpdateUserInputModel();
    const model = updateUserInputModel.getModel(id, body);

    const [error] = await this._usersService.update(model);
    if (error) {
      return [error];
    }

    return [null, {result: true}];
  }

  @MessagePattern({cmd: 'users.delete'})
  async delete(data: GetByIdDto): Promise<(Error)[]> {
    const [error] = await this._usersService.delete(data.id);
    if (error) {
      return [error];
    }

    return [null];
  }
}
