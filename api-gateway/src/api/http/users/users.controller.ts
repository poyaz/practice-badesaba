import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors
} from '@nestjs/common';
import {UsersService} from '../../../core/users.service';
import {TransformInterceptor} from '../middleware/transform.interceptor';

@Controller('api/v1/users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private readonly _usersService: UsersService) {
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
