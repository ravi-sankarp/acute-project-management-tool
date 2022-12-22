import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { clientId, UserSchema } from '@acute-project/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

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
            clientId: clientId.PROJECT_SERVICE,
            brokers: ['localhost:9092']
          },
          producerOnlyMode: false
        }
      }
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const publicKey = await fs.readFile(
          path.join(__dirname, 'secrets', 'publickey.pem'),
          'utf-8'
        );
        const options: JwtModuleOptions = {
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
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
