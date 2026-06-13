import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Mengizinkan request dari Frontend CMS
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(3001);

  console.log('DATABASE_URL:', process.env.DATABASE_URL);

  console.log(`🚀 Auth Service running on http://localhost:3001`);
}
bootstrap();
