import {Injectable, OnModuleInit} from '@nestjs/common';
import {IUsersServiceInterface} from './interface/i-users-service.interface';
import {InjectBroker} from 'nestjs-moleculer';
import {ServiceBroker} from 'moleculer';

@Injectable()
export class MoleculerUsersService implements IUsersServiceInterface, OnModuleInit {
  type = 'MOLECULER';

  constructor(
    @InjectBroker()
    private readonly _broker: ServiceBroker,
  ) {
  }

  async onModuleInit() {
    await this._broker.start();
  }

  async getAll() {
    const pattern = 'users.getAll';
    const payload = {};

    try {
      const result = await this._broker.call(pattern, payload);

      return {result: result as Array<Object>};
    } catch (e) {
      return {error: e};
    }
  }

  async getById(id: string) {
    const pattern = 'users.getById';
    const payload = {id};

    try {
      const result = await this._broker.call(pattern, payload);

      return {result};
    } catch (e) {
      return {error: MoleculerUsersService.errorHandler(e)};
    }
  }

  async addUser(body: object) {
    const pattern = 'users.create';

    try {
      const result = await this._broker.call(pattern, body);

      return {result};
    } catch (e) {
      return {error: MoleculerUsersService.errorHandler(e)};
    }
  }

  async updateUser(id, body: object) {
    const pattern = 'users.update';
    const payload = {id, ...body};

    try {
      const result = await this._broker.call(pattern, payload);

      return {result: {result}};
    } catch (e) {
      return {error: MoleculerUsersService.errorHandler(e)};
    }
  }

  async deleteUser(id) {
    const pattern = 'users.delete';
    const payload = {id};

    try {
      await this._broker.call(pattern, payload);

      return {};
    } catch (e) {
      return {error: MoleculerUsersService.errorHandler(e)};
    }
  }

  private static errorHandler(e) {
    const error = new Error(e);
    if (e.type === 'VALIDATION_ERROR' && e.data.length > 0) {
      error['response'] = {
        statusCode: 400,
        message: e.data.map((v) => v.message),
        error: 'Bad Request',
      };
      error['status'] = 400;
    } else if (e.type === 'EXIST_ERROR') {
      error['response'] = {
        statusCode: e.code,
        error: e.message.toString(),
      };
      error['status'] = e.code;
    }
    error.message = error.message.toString().replace(/MoleculerError: /, '');
    error.name = undefined;

    return error;
  }
}
