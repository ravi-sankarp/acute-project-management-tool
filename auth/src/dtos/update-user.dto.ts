import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Enter a valid email' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Please provide your first name' })
  @Length(4, 10, { message: 'First Name must be between 4 and 10' })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'Please provide your last name' })
  @Length(1, 10, { message: 'Last Name must be between 4 and 10' })
  lastName: string;

  @IsOptional()
  @IsString({ message: 'Please provide your phone number' })
  @Length(10, 10, { message: 'Phone number must of 10 characters' })
  phoneNumber: string;
}
