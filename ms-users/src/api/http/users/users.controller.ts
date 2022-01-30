import {Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post} from '@nestjs/common';
import {UsersModel} from '../../../core/model/usersModel';
import {IUsersService, USERS_SERVICE} from '../../../core/interface/i-users-service.interface';
import {AddUserDto} from './dto/add-user.dto';
import {ErrorHandler} from '../errorHandler';
import {AddUserInputModel} from './mapper/add-user-input-model';

@Controller('api/v1/users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly _usersService: IUsersService
  ) {
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string): Promise<UsersModel> {
    const [error, result] = await this._usersService.getById(id);
    if (error) {
      ErrorHandler.throwError(error as Error);
      return;
    }

    return result as UsersModel;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addUsers(
    @Body() addUserDto: AddUserDto,
  ): Promise<UsersModel> {
    const addUserInputModel = new AddUserInputModel();
    const model = addUserInputModel.getModel(addUserDto);

    const [error, data] = await this._usersService.add(model);
    if (error) {
      ErrorHandler.throwError(error as Error);
      return;
    }

    return data as UsersModel;
  }
}
