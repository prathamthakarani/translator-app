import { Body, Controller, Post } from '@nestjs/common';
import { LoginResponseDto } from 'src/translator/dto/res/login.res.dto';
import { RegistrationResponseDto } from 'src/translator/dto/res/reg.res.dto';
import { UserDto } from 'src/translator/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}
  @Post('register')
  async registerUser(
    @Body() registerUserDto: UserDto,
  ): Promise<RegistrationResponseDto> {
    return await this.authService.registerUser(registerUserDto);
  }
  @Post('login')
  async loginUser(@Body() loginUserDto: UserDto): Promise<LoginResponseDto> {
    return await this.authService.loginUser(loginUserDto);
  }

}
