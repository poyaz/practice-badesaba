import {Test, TestingModule} from '@nestjs/testing';
import {mock, MockProxy} from 'jest-mock-extended';
import {FakeUserRepository} from './fake-user.repository';
import {IIdentifierGenerator, IDENTIFIER_GENERATOR} from '../../core/interface/i-identifier-generator.interface';
import {USERS_REPOSITORY} from '../../core/interface/i-user-repository.interface';
import {UsersModel} from '../../core/model/usersModel';
import {ExistException} from '../../core/exception/exist-exception';
import {ModelIdNotExistException} from '../../core/exception/model-id-not-exist-exception';
import {NotFoundException} from '../../core/exception/not-found-exception';

describe('FakeUsersRepository', () => {
  let repository: FakeUserRepository;
  let identifierGenerator: MockProxy<IIdentifierGenerator>;
  let identifierGeneratorMock: MockProxy<IIdentifierGenerator>;
  let dataListMock: Array<{ id: string, email: string, name: string, family: string, age: number, info: string }>;

  beforeEach(async () => {
    identifierGenerator = mock<IIdentifierGenerator>();
    identifierGeneratorMock = mock<IIdentifierGenerator>();
    identifierGeneratorMock.generateId.mockReturnValue('11111111-1111-1111-1111-111111111111');
    dataListMock = [];

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FakeUserRepository,
        {
          provide: IDENTIFIER_GENERATOR,
          useValue: identifierGenerator,
        },
        {
          provide: 'FAKE_DATA',
          useValue: dataListMock
        }
      ],
    }).compile();

    repository = module.get<FakeUserRepository>(FakeUserRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('get user by id', () => {
    it('should successful get user by id (empty record)', async () => {
      const inputId = identifierGeneratorMock.generateId();

      const [error, result] = await repository.getById(inputId);

      expect(error).toBeNull();
      expect(result).toBeNull();
    });

    it('should successful get user by id (with records)', async () => {
      const inputId = identifierGeneratorMock.generateId();
      dataListMock.push({
        id: identifierGeneratorMock.generateId(),
        email: 'admin@example.com',
        name: 'admin',
        family: 'admin',
        age: 20,
        info: 'I am system administrator',
      });

      const [error, result] = await repository.getById(inputId);

      expect(error).toBeNull();
      expect(result).toBeInstanceOf(UsersModel);
      expect(result.name).toEqual('admin');
    });
  });

  describe('get all users', () => {
    it('should successful get all users', async () => {
      dataListMock.push({
        id: identifierGeneratorMock.generateId(),
        email: 'admin@example.com',
        name: 'admin',
        family: 'admin',
        age: 20,
        info: 'I am system administrator',
      });

      const [error, result] = await repository.getAll();

      expect(error).toBeNull();
      expect((result as Array<UsersModel>).length).toEqual(1);
      expect(result[0]).toBeInstanceOf(UsersModel);
    });
  });

  describe('add user', () => {
    it('should error add user when user exist in system', async () => {
      const model = new UsersModel();
      model.email = 'admin@example.com';
      dataListMock.push({
        id: identifierGeneratorMock.generateId(),
        email: 'admin@example.com',
        name: 'admin',
        family: 'admin',
        age: 20,
        info: 'I am system administrator',
      });

      const [error] = await repository.add(model);

      expect(error).toBeInstanceOf(ExistException);
    });

    it('should successful add user', async () => {
      const model = new UsersModel();
      model.email = 'admin@example.com';
      model.name = 'admin';
      model.family = 'admin';
      model.age = 20;
      model.info = '';
      identifierGenerator.generateId.mockReturnValue(identifierGeneratorMock.generateId());

      const [error, result] = await repository.add(model);

      expect(identifierGenerator.generateId).toHaveBeenCalled();
      expect(error).toBeNull();
      expect(result).toBeInstanceOf(UsersModel);
      expect((result as UsersModel).id).toEqual(identifierGeneratorMock.generateId());
    });
  });

  describe('update user', () => {
    it('should error update user when id not declare', async () => {
      const model = new UsersModel();

      const [error] = await repository.update(model);

      expect(error).toBeInstanceOf(ModelIdNotExistException);
    });

    it('should error update user when user not found', async () => {
      const model = new UsersModel();
      model.id = identifierGeneratorMock.generateId();

      const [error] = await repository.update(model);

      expect(error).toBeInstanceOf(NotFoundException);
    });

    it('should successful update user', async () => {
      const model = new UsersModel();
      model.id = identifierGeneratorMock.generateId();
      model.name = 'root';
      model.family = 'root';
      model.age = 30;
      model.info = '';
      dataListMock.push({
        id: identifierGeneratorMock.generateId(),
        email: 'admin@example.com',
        name: 'admin',
        family: 'admin',
        age: 20,
        info: 'I am system administrator',
      });

      const [error] = await repository.update(model);

      expect(error).toBeNull();
      expect(dataListMock[0].email).toEqual('admin@example.com');
      expect(dataListMock[0].name).toEqual(model.name);
      expect(dataListMock[0].family).toEqual(model.family);
      expect(dataListMock[0].age).toEqual(model.age);
      expect(dataListMock[0].info).toEqual(model.info);
    });
  });

  describe('delete user by id', () => {
    it('should error delete user when user id not found', async () => {
      const inputId = identifierGeneratorMock.generateId();

      const [error] = await repository.delete(inputId);

      expect(error).toBeInstanceOf(NotFoundException);
    });

    it('should successful delete user by id', async () => {
      const inputId = identifierGeneratorMock.generateId();
      dataListMock.push({
        id: identifierGeneratorMock.generateId(),
        email: 'admin@example.com',
        name: 'admin',
        family: 'admin',
        age: 20,
        info: 'I am system administrator',
      });

      const [error] = await repository.delete(inputId);

      expect(error).toBeNull();
      expect(dataListMock.length).toEqual(0);
    });
  });
});
