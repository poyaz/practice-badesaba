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
      expect(error).toEqual(null);
      expect(result).toBeInstanceOf(UsersModel);
    });
  });
});
