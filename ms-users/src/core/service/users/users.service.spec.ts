import {Test, TestingModule} from '@nestjs/testing';
import {mock, MockProxy} from 'jest-mock-extended';
import {UsersService} from './users.service';
import {IUserRepositoryInterface, USERS_REPOSITORY} from '../../interface/i-user-repository.interface';
import {IIdentifierGenerator} from '../../interface/i-identifier-generator.interface';
import {UnknownException} from '../../exception/unknown-exception';
import {NotFoundException} from '../../exception/not-found-exception';
import {UsersModel} from '../../model/usersModel';

describe('UsersServiceService', () => {
  let service: UsersService;
  let userRepository: MockProxy<IUserRepositoryInterface>;
  let identifierGeneratorMock: MockProxy<IIdentifierGenerator>;

  beforeEach(async () => {
    userRepository = mock<IUserRepositoryInterface>();

    identifierGeneratorMock = mock<IIdentifierGenerator>();
    identifierGeneratorMock.generateId.mockReturnValue('00000000-0000-0000-0000-000000000000');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USERS_REPOSITORY,
          useValue: userRepository,
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get user by id', () => {
    it('should error get user by id', async () => {
      const id = identifierGeneratorMock.generateId();
      userRepository.getById.mockResolvedValue([new UnknownException()]);

      const [error] = await service.getById(id);

      expect(userRepository.getById).toHaveBeenCalled();
      expect(error).toBeInstanceOf(UnknownException);
    });

    it('should error not found when user not exist by id', async () => {
      const id = identifierGeneratorMock.generateId();
      userRepository.getById.mockResolvedValue([null]);

      const [error] = await service.getById(id);

      expect(userRepository.getById).toHaveBeenCalled();
      expect(error).toBeInstanceOf(NotFoundException);
    });

    it('should successful get user by id', async () => {
      const id = identifierGeneratorMock.generateId();
      const outputModel = new UsersModel();
      userRepository.getById.mockResolvedValue([null, outputModel]);

      const [error, result] = await service.getById(id);

      expect(userRepository.getById).toHaveBeenCalled();
      expect(error).toBeNull();
      expect(result).toBeInstanceOf(UsersModel);
    });
  });

  describe('get all users', () => {
    it('should error get all users', async () => {
      userRepository.getAll.mockResolvedValue([new UnknownException()]);

      const [error] = await service.getAll();

      expect(userRepository.getAll).toHaveBeenCalled();
      expect(error).toBeInstanceOf(UnknownException);
    });

    it('should successful get all users (empty record)', async () => {
      userRepository.getAll.mockResolvedValue([null, []]);

      const [error, result] = await service.getAll();

      expect(userRepository.getAll).toHaveBeenCalled();
      expect(error).toEqual(null);
      expect(result).toEqual([]);
    });

    it('should successful get all users (with records)', async () => {
      const outputModel1 = new UsersModel();
      userRepository.getAll.mockResolvedValue([null, [outputModel1]]);

      const [error, result] = await service.getAll();

      expect(userRepository.getAll).toHaveBeenCalled();
      expect(error).toBeNull();
      expect((result as Array<UsersModel>).length).toEqual(1);
    });
  });

  describe('add user', () => {
    it('should error add new user', async () => {
      const inputModel = new UsersModel();
      userRepository.add.mockResolvedValue([new UnknownException()]);

      const [error] = await service.add(inputModel);

      expect(userRepository.add).toHaveBeenCalled();
      expect(error).toBeInstanceOf(UnknownException);
    });

    it('should successful add new user', async () => {
      const inputModel = new UsersModel();
      const outputModel = new UsersModel();
      userRepository.add.mockResolvedValue([null, outputModel]);

      const [error, result] = await service.add(inputModel);

      expect(userRepository.add).toHaveBeenCalled();
      expect(error).toBeNull();
      expect(result).toBeInstanceOf(UsersModel);
    });
  });

  describe('update user', () => {
    it('should error update user by id when check user exist', async () => {
      const inputModel = new UsersModel();
      inputModel.id = identifierGeneratorMock.generateId();
      inputModel.age = 30;
      userRepository.getById.mockResolvedValue([new UnknownException()]);

      const [error] = await service.update(inputModel);

      expect(userRepository.getById).toHaveBeenCalled();
      expect(error).toBeInstanceOf(UnknownException);
    });

    it('should error update user by id', async () => {
      const inputModel = new UsersModel();
      inputModel.id = identifierGeneratorMock.generateId();
      inputModel.age = 30;
      const outputModel = new UsersModel();
      userRepository.getById.mockResolvedValue([null, outputModel]);
      userRepository.update.mockResolvedValue([new UnknownException()]);

      const [error] = await service.update(inputModel);

      expect(userRepository.getById).toHaveBeenCalled();
      expect(userRepository.update).toHaveBeenCalled();
      expect(error).toBeInstanceOf(UnknownException);
    });

    it('should successful update user by id', async () => {
      const inputModel = new UsersModel();
      inputModel.id = identifierGeneratorMock.generateId();
      inputModel.age = 30;
      const outputModel = new UsersModel();
      userRepository.getById.mockResolvedValue([null, outputModel]);
      userRepository.update.mockResolvedValue([null]);

      const [error] = await service.update(inputModel);

      expect(userRepository.getById).toHaveBeenCalled();
      expect(userRepository.update).toHaveBeenCalled();
      expect(error).toBeNull();
    });
  });
});
