import {Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Put} from '@nestjs/common';
import {UsersModel} from '../../../core/model/usersModel';
import {IUsersService, USERS_SERVICE} from '../../../core/interface/i-users-service.interface';
import {AddUserDto} from './dto/add-user.dto';
import {ErrorHandler} from '../errorHandler';
import {AddUserInputModel} from './mapper/add-user-input-model';
import {ChangePasswordUserDto} from './dto/change-password-user.dto';
import {ChangePasswordUserInputModel} from './mapper/change-password-user-input-model';
import {UpdateUserDto} from './dto/update-user.dto';
import {UpdateUserInputModel} from './mapper/update-user-input-model';

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

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Array<UsersModel>> {
    const [error, result] = await this._usersService.getAll();
    if (error) {
      ErrorHandler.throwError(error as Error);
      return;
    }

    return result as Array<UsersModel>;
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

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateDto: UpdateUserDto): Promise<boolean> {
    const updateUserInputModel = new UpdateUserInputModel();
    const model = updateUserInputModel.getModel(id, updateDto);

    const [error] = await this._usersService.update(model);
    if (error) {
      ErrorHandler.throwError(error as Error);
      return;
    }

    return true;
  }

  @Get(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const [error] = await this._usersService.delete(id);

    if (error) {
      ErrorHandler.throwError(error as Error);
      return;
    }
  }
}
