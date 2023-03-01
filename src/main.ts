import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { LoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.use(new LoggerMiddleware())
  await app.listen(process.env.PORT);
}
bootstrap();
