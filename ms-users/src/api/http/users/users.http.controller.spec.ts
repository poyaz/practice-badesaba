import {Test, TestingModule} from '@nestjs/testing';
import {HttpCode, HttpException, HttpStatus} from '@nestjs/common';
import {mock, MockProxy} from 'jest-mock-extended';
import {UsersHttpController} from './users.http.controller';
import {IUsersService, USERS_SERVICE} from '../../../core/interface/i-users-service.interface';
import {IIdentifierGenerator} from '../../../core/interface/i-identifier-generator.interface';
import {UsersModel} from '../../../core/model/usersModel';
import {AddUserDto} from './dto/add-user.dto';
import {UnknownException} from '../../../core/exception/unknown-exception';
import {NotFoundException} from '../../../core/exception/not-found-exception';
import {UpdateUserDto} from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersHttpController;
  // let usersService: jest.Mocked<IUsersService>;
  let usersService: MockProxy<IUsersService>;
  let identifierGeneratorMock: MockProxy<IIdentifierGenerator>;

  beforeEach(async () => {
    usersService = mock<IUsersService>();

    identifierGeneratorMock = mock<IIdentifierGenerator>();
    identifierGeneratorMock.generateId.mockReturnValue('00000000-0000-0000-0000-000000000000');

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersHttpController],
      providers: [
        {
          provide: USERS_SERVICE,
          useValue: usersService,
        }
      ]
    }).compile();

    controller = module.get<UsersHttpController>(UsersHttpController);
    // usersService = module.get<jest.Mocked<IUsersService>>(USERS_SERVICE);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get user by id', () => {
    it('should error gey user by id', async () => {
      const inputId = identifierGeneratorMock.generateId();
      usersService.getById.mockResolvedValue([new UnknownException()]);
      let error;

      try {
        await controller.getById(inputId);
      } catch (e) {
        error = e;
      }

      expect(usersService.getById).toHaveBeenCalled();
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
    });

    it('should error gey user by id when user not found', async () => {
      const inputId = identifierGeneratorMock.generateId();
      usersService.getById.mockResolvedValue([new NotFoundException()]);
      let error;

      try {
        await controller.getById(inputId);
      } catch (e) {
        error = e;
      }

      expect(usersService.getById).toHaveBeenCalled();
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toEqual(HttpStatus.NOT_FOUND);
    });

    it('should successful gey user by id', async () => {
      const inputId = identifierGeneratorMock.generateId();
      const outputModel = new UsersModel();
      outputModel.id = identifierGeneratorMock.generateId();
      outputModel.name = 'alex';
      outputModel.family = 'morgan';
      outputModel.email = 'alex042@example.com';
      outputModel.age = 20;
      outputModel.info = '';
      usersService.getById.mockResolvedValue([null, outputModel]);

      const result = await controller.getById(inputId);

      expect(usersService.getById).toHaveBeenCalled();
      expect(result.id).toEqual(identifierGeneratorMock.generateId());
      expect(result.name).toEqual(outputModel.name);
      expect(result.family).toEqual(outputModel.family);
      expect(result.email).toEqual(outputModel.email);
      expect(result.age).toEqual(outputModel.age);
      expect(result.info).toEqual(outputModel.info);
    });
  });

  describe('get all users', () => {
    it('should error get all users', async () => {
      usersService.getAll.mockResolvedValue([new UnknownException()]);
      let error;

      try {
        await controller.getAll();
      } catch (e) {
        error = e;
      }

      expect(usersService.getAll).toHaveBeenCalled();
      expect(error).toBeInstanceOf(HttpException);
    });

    it('should successful get all user (empty record)', async () => {
      usersService.getAll.mockResolvedValue([null, []]);

      const result = await controller.getAll();

      expect(usersService.getAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should successful get all user (with records)', async () => {
      const outputModel1 = new UsersModel();
      outputModel1.id = identifierGeneratorMock.generateId();
      outputModel1.name = 'alex';
      outputModel1.family = 'morgan';
      outputModel1.email = 'alex042@example.com';
      outputModel1.age = 20;
      outputModel1.info = '';
      usersService.getAll.mockResolvedValue([null, [outputModel1]]);

      const result = await controller.getAll();

      expect(usersService.getAll).toHaveBeenCalled();
      expect(result.length).toEqual(1);
      expect(result[0].id).toEqual(identifierGeneratorMock.generateId());
      expect(result[0].name).toEqual(outputModel1.name);
      expect(result[0].family).toEqual(outputModel1.family);
      expect(result[0].email).toEqual(outputModel1.email);
      expect(result[0].age).toEqual(outputModel1.age);
      expect(result[0].info).toEqual(outputModel1.info);
    });
  });

  describe('add user', () => {
    let addUserDto;

    beforeAll(() => {
      addUserDto = new AddUserDto();
      addUserDto.username = 'alex042@example.com';
      addUserDto.password = 'my-password';
      addUserDto.name = 'alex';
      addUserDto.family = 'morgan';
      addUserDto.age = 20;
      addUserDto.info = '';
    });

    it('should error add user data', async () => {
      const body = addUserDto;
      usersService.add.mockResolvedValue([new UnknownException()]);
      let error;

      try {
        await controller.addUser(body);
      } catch (e) {
        error = e;
      }

      expect(usersService.add).toHaveBeenCalled();
      expect(error).toBeInstanceOf(HttpException);
    });

    it('should successful add user data', async () => {
      const body = addUserDto;
      const outputModel = new UsersModel();
      outputModel.id = identifierGeneratorMock.generateId();
      outputModel.name = addUserDto.name;
      outputModel.family = addUserDto.family;
      outputModel.email = addUserDto.username;
      outputModel.age = addUserDto.age;
      outputModel.info = addUserDto.info;
      usersService.add.mockResolvedValue([null, outputModel]);

      const result = await controller.addUser(body);

      expect(usersService.add).toHaveBeenCalled();
      expect(result.id).toEqual(identifierGeneratorMock.generateId());
      expect(result.name).toEqual(outputModel.name);
      expect(result.family).toEqual(outputModel.family);
      expect(result.email).toEqual(outputModel.email);
      expect(result.age).toEqual(outputModel.age);
      expect(result.info).toEqual(outputModel.info);
    });
  });

  describe('update user', () => {
    it('should error when update user by id', async () => {
      const inputId = identifierGeneratorMock.generateId();
      const body = new UpdateUserDto();
      body.name = 'Frank';
      body.family = 'Woods';
      body.age = 30;
      body.info = 'I am soldier.';
      usersService.update.mockResolvedValue([new UnknownException()]);
      let error;

      try {
        await controller.update(inputId, body);
      } catch (e) {
        error = e;
      }

      expect(usersService.update).toBeCalled();
      expect(usersService.update).toBeCalledWith(expect.objectContaining({
        id: identifierGeneratorMock.generateId(),
        email: null,
        name: body.name,
        family: body.family,
        age: body.age,
        info: body.info,
      }));
      expect(error).toBeInstanceOf(HttpException);
    });

    it('should successful update user by id', async () => {
      const inputId = identifierGeneratorMock.generateId();
      const body = new UpdateUserDto();
      body.name = 'Frank';
      body.family = 'Woods';
      body.age = 30;
      body.info = 'I am soldier.';
      usersService.update.mockResolvedValue([null]);

      const result = await controller.update(inputId, body);

      expect(usersService.update).toBeCalled();
      expect(usersService.update).toBeCalledWith(expect.objectContaining({
        id: identifierGeneratorMock.generateId(),
        email: null,
        name: body.name,
        family: body.family,
        age: body.age,
        info: body.info,
      }));
      expect(result).toEqual({result: true});
    });
  });

  describe('delete user', () => {
    it('should error when delete user by id', async () => {
      const inputId = identifierGeneratorMock.generateId();
      usersService.delete.mockResolvedValue([new UnknownException()]);
      let error;

      try {
        await controller.delete(inputId);
      } catch (e) {
        error = e;
      }

      expect(usersService.delete).toBeCalled();
      expect(error).toBeInstanceOf(HttpException);
    });

    it('should successful delete user by id', async () => {
      const inputId = identifierGeneratorMock.generateId();
      usersService.delete.mockResolvedValue([null]);

      await controller.delete(inputId);

      expect(usersService.delete).toBeCalled();
    });
  });
});
