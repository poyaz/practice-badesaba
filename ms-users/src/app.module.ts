import {Module} from '@nestjs/common';
import {UsersController} from './api/http/users/users.controller';
import {UsersService} from './core/service/users/users.service';
import {USERS_SERVICE} from './core/interface/i-users-service.interface';
import {IDENTIFIER_GENERATOR} from './core/interface/i-identifier-generator.interface';
import {UuidIdentifierGenerator} from './infrastructure/system/uuid-identifier-generator';
import {USERS_REPOSITORY} from './core/interface/i-user-repository.interface';
import {FakeUserRepository} from './infrastructure/repository/fake-user.repository';

const dataList: Array<{ id: string, email: string, name: string, family: string, age: number, info: string }> = [];
dataList.push({
  id: '00000000-0000-0000-0000-000000000000',
  email: 'admin@example.com',
  name: 'admin',
  family: 'admin',
  age: 20,
  info: 'I am system administrator',
});

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: USERS_SERVICE,
      useClass: UsersService,
    },
    {
      provide: USERS_REPOSITORY,
      useClass: FakeUserRepository,
    },
    {
      provide: IDENTIFIER_GENERATOR,
      useClass: UuidIdentifierGenerator,
    },
    {
      provide: 'FAKE_DATA',
      useValue: dataList
    }
  ],
})
export class AppModule {
}
