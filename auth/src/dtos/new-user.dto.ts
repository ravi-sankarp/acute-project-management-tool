import { IsEmail, IsString, Length } from 'class-validator';

export class NewUserDto {
  @IsEmail({}, { message: 'Enter a valid email' })
  email: string;

  @IsString({ message: 'Please provide your first name' })
  @Length(4, 10, { message: 'First Name must be between 4 and 10' })
  firstName: string;

  @IsString({ message: 'Please provide your last name' })
  @Length(1, 10, { message: 'Last Name must be between 4 and 10' })
  lastName: string;

  @IsString({ message: 'Please provide your phone number' })
  @Length(10, 10, { message: 'Phone number must of 10 characters' })
  phoneNumber: string;

  @IsString({ message: 'Please provide a password' })
  password: string;

  @IsString({ message: 'Please confirm your password' })
  confirmPassword: string;
}
