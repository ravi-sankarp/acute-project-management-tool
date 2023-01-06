import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
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

    let token: string;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Not authorized to access this route');
      }
    } else {
      throw new UnauthorizedException('Not authorized to access this route');
    }

    const payload: JwtUserPayload = await this.jwtService.verifyAsync(token);
    const user = await this.usersService.getUserDetailsById(payload.id);

    if (!user) {
      throw new UnauthorizedException('Cannot find your account');
    }
    req.currentUser = user;

    return handler.handle();
  }
}
