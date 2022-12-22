import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CustomErrorExceptionFilter } from '@acute-project/common';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { EventsModule } from './events/events.module';

async function bootstrap() {
  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(EventsModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092']
      },
      consumer: {
        groupId: 'project-consumer'
      }
    }
  });

  await kafkaApp.listen();
  console.log('Kafka consumer service running');

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

  await app.listen(4000);
  console.log('Project service running on port 4000');
}
bootstrap();
