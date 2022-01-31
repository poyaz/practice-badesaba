import {IUserRepositoryInterface} from '../../core/interface/i-user-repository.interface';
import {UsersModel} from '../../core/model/usersModel';
import {Inject, Injectable} from '@nestjs/common';
import {IDENTIFIER_GENERATOR, IIdentifierGenerator} from '../../core/interface/i-identifier-generator.interface';
import {ExistException} from '../../core/exception/exist-exception';
import {ModelIdNotExistException} from '../../core/exception/model-id-not-exist-exception';
import {NotFoundException} from '../../core/exception/not-found-exception';

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

  async update(model: UsersModel): Promise<Error[]> {
    if (model.id === null || model.id === undefined) {
      return [new ModelIdNotExistException()];
    }
    const findIndex = this._dataList.findIndex((v) => v.id === model.id);
    if (findIndex === -1) {
      return [new NotFoundException()];
    }

    if (model.name !== null && model.name !== undefined) {
      this._dataList[findIndex].name = model.name;
    }
    if (model.email !== null && model.email !== undefined) {
      this._dataList[findIndex].email = model.email;
    }
    if (model.family !== null && model.family !== undefined) {
      this._dataList[findIndex].family = model.family;
    }
    if (model.age !== null && model.age !== undefined) {
      this._dataList[findIndex].age = model.age;
    }
    if (model.info !== null && model.info !== undefined) {
      this._dataList[findIndex].info = model.info;
    }

    return [null];
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
