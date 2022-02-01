import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {Config} from './module/config';
import {Transport} from '@nestjs/microservices';

const IP_ADDRESS = Config.getStr('server.host', '127.0.0.1');
const HTTP_PORT_BIND = Config.getNum('server.http.port', 3000);
const RPC_PORT_BIND = Config.getNum('server.rpc.port', 8888);

async function bootstrap() {
  const http = await NestFactory.create(AppModule);
  http.useGlobalPipes(new ValidationPipe());
  await http.listen(HTTP_PORT_BIND, IP_ADDRESS);

  const message = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: IP_ADDRESS,
      port: RPC_PORT_BIND,
    },
  });
  message.useGlobalPipes(new ValidationPipe());
  await message.listen();
}

bootstrap().catch((error) => {
  console.log(error);
  process.exit(1);
});
