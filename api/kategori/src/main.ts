import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as express from 'express';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS untuk CMS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // prefix API
  app.setGlobalPrefix('api');

  // body parser (WAJIB)
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT || 3003);
}

void bootstrap();