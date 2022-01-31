import {IUserRepositoryInterface} from '../../core/interface/i-user-repository.interface';
import {UsersModel} from '../../core/model/usersModel';
import {Inject, Injectable} from '@nestjs/common';
import {IDENTIFIER_GENERATOR, IIdentifierGenerator} from '../../core/interface/i-identifier-generator.interface';
import {ExistException} from '../../core/exception/exist-exception';

@Injectable()
export class FakeUserRepository implements IUserRepositoryInterface {
  constructor(
    @Inject(IDENTIFIER_GENERATOR)
    private readonly _identifierGenerator: IIdentifierGenerator,
    @Inject('FAKE_DATA')
    private _dataList: Array<{ id: string, email: string, name: string, family: string, age: number, info: string }>
  ) {
  }

  async add(model: UsersModel): Promise<(Error | UsersModel)[]> {
    const exist = this._dataList.findIndex((v) => v.email === model.email);
    if (exist > -1) {
      return [new ExistException()];
    }

    model.id = this._identifierGenerator.generateId();
    this._dataList.push(model);

    const [, result] = await this.getById(model.id);

    return [null, result];
  }

  delete(id: string): Promise<Error[]> {
    return Promise.resolve([]);
  }

  async getAll(): Promise<(Error | UsersModel[])[]> {
    const result = this._dataList.map((v) => FakeUserRepository._fillModel(v));

    return [null, result];
  }

  async getById(id: string): Promise<(Error | UsersModel | null)[]> {
    const row = this._dataList.find((v) => v.id === id);
    if (row === undefined) {
      return [null, null];
    }

    const result = FakeUserRepository._fillModel(row);

    return [null, result];
  }

  update(model: UsersModel): Promise<Error[]> {
    return Promise.resolve([]);
  }

  private static _fillModel(row) {
    const model = new UsersModel();
    model.id = row.id;
    model.email = row.email;
    model.name = row.name;
    model.family = row.family;
    model.age = row.age;
    model.info = row.info;

    return model;
  }
}
