import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserDocument } from './app.schema';
import { AppService } from './app.service';

interface JwtUserPayload {
  id: string;
}

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: AppService, private jwtService: JwtService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const req: Request & { currentUser: UserDocument } = context.switchToHttp().getRequest();
    if (req.cookies.token) {
      const { token } = req.cookies;
      const payload: JwtUserPayload = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.getUserDetailsById(payload.id);
      req.currentUser = user;
    } else {
      throw new UnauthorizedException('Not authorized to access this route');
    }

    return handler.handle();
  }
}
