import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './app.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthKafkaService } from './app.kafkaservice';
import { clientId } from '@acute-project/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, 'secrets', '.env'),
      cache: true
    }),
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: clientId.AUTH_SERVICE,
            brokers: ['localhost:9092']
          },
          producerOnlyMode: true
        }
      }
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const privateKey = await fs.readFile(
          path.join(__dirname, 'secrets', 'privatekey.pem'),
          'utf-8'
        );
        const publicKey = await fs.readFile(
          path.join(__dirname, 'secrets', 'publickey.pem'),
          'utf-8'
        );
        const options: JwtModuleOptions = {
          privateKey,
          publicKey,
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRY_TIME'),
            issuer: 'Auth Service ',
            algorithm: 'RS256'
          }
        };
        return options;
      },
      inject: [ConfigService]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URL')
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])
  ],
  controllers: [AppController],
  providers: [AppService, AuthKafkaService]
})
export class AppModule {}
