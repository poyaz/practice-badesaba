import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {Config} from './module/config';

const IP_ADDRESS = Config.getStr('server.host', '127.0.0.1');
const PORT_BIND = Config.getNum('server.http.port', 3000);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT_BIND, IP_ADDRESS);
}

bootstrap().catch((error) => {
  console.log(error);
  process.exit(1);
});
