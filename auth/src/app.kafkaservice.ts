import { topics, userDetails } from '@acute-project/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthKafkaService {
  constructor(@Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka) {}

  userCreated(userDetails: userDetails) {
    this.authClient.emit(topics.USER_CREATED, userDetails);
  }

  userDataUpdated(userDetails: userDetails) {
    this.authClient.emit(topics.USER_UPDATED, userDetails);
  }

  userDeleted(id: string) {
    this.authClient.emit(topics.USER_DELETED, id);
  }
}
