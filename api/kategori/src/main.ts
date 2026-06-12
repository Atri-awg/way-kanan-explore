import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // tambahkan prefix "api"
  app.setGlobalPrefix('api');

  // atur hanya ip localhost yang dapat mengakses api
  await app.listen(process.env.PORT!, 'localhost');
}
void bootstrap();
