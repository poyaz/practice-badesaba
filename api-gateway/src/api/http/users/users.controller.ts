import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus, Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {TransformInterceptor} from '../middleware/transform.interceptor';
import {IUsersServiceInterface, USERS_SERVICE} from '../../../core/interface/i-users-service.interface';

@Controller('api/v1/users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  private readonly _usersService;

  constructor(
    @Inject(USERS_SERVICE)
      usersService: Array<IUsersServiceInterface>,
  ) {
    this._usersService = usersService.filter((v) => v.type === 'MOLECULER')[0];
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return this._usersService.getById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this._usersService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Body() body: object) {
    return this._usersService.addUser(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() body) {
    return this._usersService.updateUser(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this._usersService.deleteUser(id);
  }
}
