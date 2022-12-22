import { topics, userDetails } from '@acute-project/common';
import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, KafkaRetriableException, Payload } from '@nestjs/microservices';
import { EventService } from './events.service';

@Controller()
export class EventController {
  constructor(private readonly userService: EventService) {}

  @EventPattern(topics.USER_CREATED)
  handleUserCreate(@Payload(ValidationPipe) data: userDetails) {
    this.userService.createUser(data);
  }

  @EventPattern(topics.USER_UPDATED)
  async handleUserUpdated(@Payload(ValidationPipe) data: userDetails) {
    const user = await this.userService.findUserById(data._id);
    if (user.__v !== data.__v) {
      throw new KafkaRetriableException('Invalid data');
    }

    this.userService.findUserByIdAndUpdate(user.id, data);
  }

  @EventPattern(topics.USER_DELETED)
  handleUserDeleted(@Payload(ValidationPipe) id: string) {
    this.userService.deleteUserAccount(id);
  }
}
