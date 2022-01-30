import {Test, TestingModule} from '@nestjs/testing';
import {HttpCode, HttpException, HttpStatus} from '@nestjs/common';
import {mock, MockProxy} from 'jest-mock-extended';
import {UsersController} from './users.controller';
import {IUsersService, USERS_SERVICE} from '../../../core/interface/i-users-service.interface';
import {IIdentifierGenerator} from '../../../core/interface/i-identifier-generator.interface';
import {UsersModel} from '../../../core/model/usersModel';
import {AddUserDto} from './dto/add-user.dto';
import {UnknownException} from '../../../core/exception/unknown-exception';
import {NotFoundException} from '../../../core/exception/not-found-exception';

describe('UsersController', () => {
  let controller: UsersController;
  // let usersService: jest.Mocked<IUsersService>;
  let usersService: MockProxy<IUsersService>;
  let identifierGeneratorMock: MockProxy<IIdentifierGenerator>;

  beforeEach(async () => {
    usersService = mock<IUsersService>();

    identifierGeneratorMock = mock<IIdentifierGenerator>();
    identifierGeneratorMock.generateId.mockReturnValue('00000000-0000-0000-0000-000000000000');

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: USERS_SERVICE,
          useValue: usersService,
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
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
      outputModel.username = 'alex042';
      outputModel.password = 'hash-password';
      outputModel.age = 20;
      outputModel.info = '';
      usersService.getById.mockResolvedValue([null, outputModel]);

      const result = await controller.getById(inputId);

      expect(usersService.getById).toHaveBeenCalled();
      expect(result.id).toEqual(identifierGeneratorMock.generateId());
      expect(result.name).toEqual(outputModel.name);
      expect(result.family).toEqual(outputModel.family);
      expect(result.username).toEqual(outputModel.username);
      expect(result.password).toEqual(outputModel.password);
      expect(result.age).toEqual(outputModel.age);
      expect(result.info).toEqual(outputModel.info);
    });
  });

  describe('add user', () => {
    let addUserDto;

    beforeAll(() => {
      addUserDto = new AddUserDto();
      addUserDto.username = 'alex042';
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
        await controller.addUsers(body);
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
      outputModel.username = addUserDto.username;
      outputModel.password = 'hash-password';
      outputModel.age = addUserDto.age;
      outputModel.info = addUserDto.info;
      usersService.add.mockResolvedValue([null, outputModel]);

      const result = await controller.addUsers(body);

      expect(usersService.add).toHaveBeenCalled();
      expect(result.id).toEqual(identifierGeneratorMock.generateId());
      expect(result.name).toEqual(outputModel.name);
      expect(result.family).toEqual(outputModel.family);
      expect(result.username).toEqual(outputModel.username);
      expect(result.password).toEqual(outputModel.password);
      expect(result.age).toEqual(outputModel.age);
      expect(result.info).toEqual(outputModel.info);
    });
  });
});
