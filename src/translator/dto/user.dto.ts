import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  @MinLength(5)
  userPassword: string;
}