import { UserSchema } from '@acute-project/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './events.controller';
import { EventService } from './events.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URL')
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])
  ],
  controllers: [EventController],
  providers: [EventService]
})
export class EventsModule {}
