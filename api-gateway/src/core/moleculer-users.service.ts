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
    } catch (error) {
      return {error};
    }
  }

  async getById(id: string) {
    const pattern = 'users.getById';
    const payload = {id};

    try {
      const result = await this._broker.call(pattern, payload);

      return {result};
    } catch (error) {
      return {error};
    }
  }

  async addUser(body: object) {
    const pattern = 'users.create';

    try {
      const result = await this._broker.call(pattern, body);

      return {result};
    } catch (error) {
      return {error};
    }
  }

  async updateUser(id, body: object) {
    const pattern = 'users.update';
    const payload = {id, ...body};

    try {
      const result = await this._broker.call(pattern, payload);

      return {result};
    } catch (error) {
      return {error};
    }
  }

  async deleteUser(id) {
    const pattern = 'users.delete';
    const payload = {id};

    try {
      const result = await this._broker.call(pattern, payload);

      return {result};
    } catch (error) {
      return {error};
    }
  }
}
