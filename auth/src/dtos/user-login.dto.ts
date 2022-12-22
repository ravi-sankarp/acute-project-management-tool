import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Enter a valid email' })
  email: string;

  @IsString({ message: 'Please provide a password' })
  password: string;
}
