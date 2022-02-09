import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {UsersController} from './api/http/users/users.controller';
import {UsersService} from './core/users.service';
import {Config} from './module/config';

const MS_USER_PROTOCOL = Config.getStr('service.users.protocol');
const MS_USER_HOST = Config.getStr('service.users.host', '127.0.0.1');
const MS_USER_PORT = Config.getNum('service.users.port', 4222);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MS_USERS',
        transport: Transport.NATS,
        options: {
          servers: [`${MS_USER_PROTOCOL}://${MS_USER_HOST}:${MS_USER_PORT}`],
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {
}
