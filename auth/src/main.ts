import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import { CustomErrorExceptionFilter } from '@acute-project/common';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new CustomErrorExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST
    })
  );

  app.use(cookieParser());

  app.use(morgan('dev'));

  await app.listen(3000);

  console.log('Auth service running on port 3000');
}
bootstrap();
