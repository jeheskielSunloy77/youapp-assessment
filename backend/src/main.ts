import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors();

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const errorMessages = errors.reduce(
          (acc, curr) => {
            acc[curr.property] =
              curr.constraints[Object.keys(curr.constraints)[0]];
            return acc;
          },
          {} as Record<string, string>,
        );
        return new BadRequestException({
          statusCode: 400,
          message: errorMessages,
          error: 'Bad Request',
        });
      },
      stopAtFirstError: true,
      whitelist: true,
    }),
  );

  await app.listen(8080);
}
bootstrap();
