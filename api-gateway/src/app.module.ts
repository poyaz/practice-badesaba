import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {UsersController} from './api/http/users/users.controller';
import {UsersService} from './core/users.service';
import {Config} from './module/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MS_USERS',
        transport: Transport.TCP,
        options: {
          host: Config.getStr('service.users.host', '127.0.0.1'),
          port: Config.getNum('service.users.port', 8888),
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {
}
