import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {UsersController} from './api/http/users/users.controller';
import {MsUsersService} from './core/ms-users.service';
import {MoleculerUsersService} from './core/moleculer-users.service';
import {Config} from './module/config';
import {MoleculerModule} from 'nestjs-moleculer';
import {USERS_SERVICE} from './core/interface/i-users-service.interface';

const MS_USERS_HOST = Config.getStr('service.ms_users.host', '127.0.0.1');
const MS_USERS_PORT = Config.getNum('service.ms_users.port', 8888);

const MOLECULER_USER_HOST = Config.getStr('service.moleculer_users.host', '127.0.0.1');
const MOLECULER_USER_PORT = Config.getNum('service.moleculer_users.port', 4222);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MS_USERS',
        transport: Transport.TCP,
        options: {
          host: MS_USERS_HOST,
          port: MS_USERS_PORT,
        },
      },
    ]),
    MoleculerModule.forRoot({
      transporter: `nats://${MOLECULER_USER_HOST}:${MOLECULER_USER_PORT}`,
    }),
  ],
  controllers: [UsersController],
  providers: [
    MsUsersService,
    MoleculerUsersService,
    {
      provide: USERS_SERVICE,
      useFactory: (msUsers, moleculerUsers) => [msUsers, moleculerUsers],
      inject: [MsUsersService, MoleculerUsersService],
    },
  ],
})
export class AppModule {
}
