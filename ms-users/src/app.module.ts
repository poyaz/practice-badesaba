import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersController} from './api/http/users/users.controller';
import {UsersService} from './core/service/users/users.service';
import {USERS_SERVICE} from './core/interface/i-users-service.interface';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      useClass: UsersService,
      provide: USERS_SERVICE
    },
  ],
})
export class AppModule {
}
