import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {IUsersServiceInterface} from './interface/i-users-service.interface';

@Injectable()
export class MsUsersService implements IUsersServiceInterface {
  type = 'MS';

  constructor(
    @Inject('MS_USERS')
    private readonly _clientMsUsers: ClientProxy,
  ) {
  }

  async getAll() {
    const pattern = {cmd: 'users.getAll'};
    const payload = {};

    return this._clientMsUsers.send(pattern, payload).toPromise();
  }

  async getById(id: string) {
    const pattern = {cmd: 'users.getById'};
    const payload = {id};

    return this._clientMsUsers.send(pattern, payload).toPromise();
  }

  async addUser(body: object) {
    const pattern = {cmd: 'users.add'};

    return this._clientMsUsers.send(pattern, body).toPromise();
  }

  async updateUser(id, body: object) {
    const pattern = {cmd: 'users.update'};
    const payload = {id, ...body};

    return this._clientMsUsers.send(pattern, payload).toPromise();
  }

  async deleteUser(id) {
    const pattern = {cmd: 'users.delete'};
    const payload = {id};

    return this._clientMsUsers.send(pattern, payload).toPromise();
  }
}
