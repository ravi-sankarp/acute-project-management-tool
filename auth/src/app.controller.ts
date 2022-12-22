import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Post,
  Res,
  UseInterceptors
} from '@nestjs/common';
import { Response } from 'express';
import { comparePassword } from '@acute-project/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { LoginUserDto } from './dtos/user-login.dto';
import { NewUserDto } from './dtos/new-user.dto';
import { AuthKafkaService } from './app.kafkaservice';
import { CurrentUserInterceptor } from './auth.interceptor';
import { CurrentUser } from './auth.decorator';
import { UserDocument, Users } from './app.schema';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private kafkaService: AuthKafkaService
  ) {}

  @HttpCode(200)
  @Post('/login')
  async userLogin(@Body() data: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    // get user data from the service
    const user = await this.appService.getUserDetailsByEmail(data.email);

    // Send bad request as response if user was not found
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    // checking if passwords match
    if (!comparePassword(data.password, user.password)) {
      // rejecting the request if passwords does not match
      throw new BadRequestException('Invalid credentials');
    }

    //sending token as response on successfull login
    const token = await this.jwtService.signAsync({ id: user.id });
    res.cookie('token', token, {
      sameSite: true,
      httpOnly: true,
      expires: this.configService.get('JWT_EXPIRY-TIME'),
      secure: this.configService.get('NODE_ENV') === 'production' ? true : false
    });
    return {
      status: 'success',
      message: 'Login Successfull'
    };
  }

  @Post('/register')
  async userRegister(@Body() data: NewUserDto, @Res({ passthrough: true }) res: Response) {
    // checking if password and confirm password match
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('Password and confirm password does not match');
    }

    //checking if email already exists
    const user = await this.appService.getUserDetailsByEmail(data.email);
    if (user) {
      throw new ConflictException('Email already exists');
    }

    //checking if phone number already exists
    const userExists = await this.appService.checkPhoneNumberExists(data.phoneNumber);
    if (userExists) {
      throw new ConflictException('Phone number already exists');
    }

    const createdUser = await this.appService.createUser(data);

    //sending token as response on successfull login
    const token = await this.jwtService.signAsync({ id: createdUser.id });
    res.cookie('token', token, {
      sameSite: true,
      httpOnly: true,
      expires: this.configService.get('JWT_EXPIRY-TIME'),
      secure: this.configService.get('NODE_ENV') === 'production' ? true : false
    });

    const userDetails = {
      _id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      isDeleted: createdUser.isDeleted,
      __v: createdUser.__v
    };
    this.kafkaService.userCreated(userDetails);
    return {
      status: 'success',
      message: 'Successfully created your account'
    };
  }

  @Post('/userdetails')
  @UseInterceptors(CurrentUserInterceptor)
  async updateUserDetails(@Body() data: UpdateUserDto, @CurrentUser() user: UserDocument) {
    //checking if email already exists
    if (data.email !== user.email) {
      const userExists = await this.appService.getUserDetailsByEmail(data.email);
      if (userExists) {
        throw new ConflictException('Email already exists');
      }
    }

    //checking if phone number already exists
    if (data.phoneNumber !== user.phoneNumber) {
      const userExists = await this.appService.checkPhoneNumberExists(data.phoneNumber);
      if (userExists) {
        throw new ConflictException('Phone number already exists');
      }
    }

    const updateData = {
      email: data.email ?? user.email,
      phoneNumber: data.phoneNumber ?? user.phoneNumber,
      firstName: data.firstName ?? user.firstName,
      lastName: data.lastName ?? user.lastName
    };

    const userDetails = await this.appService.updateUserDetails(user.id, updateData);
    const details = {
      _id: userDetails.id,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      isDeleted: userDetails.isDeleted,
      __v: userDetails.__v
    };
    this.kafkaService.userDataUpdated(details);

    return {
      status: 'success',
      message: 'Successfully updated your details'
    };
  }

  @Delete('/deleteaccount')
  @UseInterceptors(CurrentUserInterceptor)
  async deleteUserAccount(@CurrentUser() user: UserDocument) {
    await this.appService.deleteUserAccount(user.id);
    this.kafkaService.userDeleted(user.id);
    return {
      status: 'success',
      message: 'Successfully deleted your account'
    };
  }
}
