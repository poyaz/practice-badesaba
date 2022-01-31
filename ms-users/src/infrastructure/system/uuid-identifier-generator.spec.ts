import {Test, TestingModule} from '@nestjs/testing';

import * as uuid from 'uuid';
jest.mock('uuid', () => ({
  v4: () => '00000000-0000-0000-0000-000000000000'
}));

import {UuidIdentifierGenerator} from './uuid-identifier-generator';

describe('UuidIdentifierGenerator', () => {
  let repository: UuidIdentifierGenerator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UuidIdentifierGenerator],
    }).compile();

    repository = module.get<UuidIdentifierGenerator>(UuidIdentifierGenerator);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should successful return string uuid', () => {
    const result = repository.generateId();

    expect(result).toEqual('00000000-0000-0000-0000-000000000000');
  });
});
