import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {

  @IsEmail()
  @ApiProperty({name:"userEmail",description:"Email of user",type:"string",required:true})
  userEmail: string;

  @IsNotEmpty()
  @ApiProperty({name:"userPassword",description:"Password of user",type:"string",required:true})
  @MinLength(5)
  userPassword: string;
}