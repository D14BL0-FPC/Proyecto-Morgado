import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(80);
  console.log('Servidor corriendo en http://localhost:80');
}
bootstrap();

