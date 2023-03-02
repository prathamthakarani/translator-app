import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { User } from "src/db/entities/user.entity";
import { LoginResponseDto } from "src/translator/dto/res/login.res.dto";
import { RegistrationResponseDto } from "src/translator/dto/res/reg.res.dto";
import { UserDto } from "src/translator/dto/user.dto";
import { DataSource } from "typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @Inject("datasource") private dataSource: DataSource,
    private jwtService: JwtService
    
  ) {}
  

  async registerUser(
    registerUserDto: UserDto
  ): Promise<RegistrationResponseDto> {
    const { userEmail, userPassword } = registerUserDto;
    try {
      const userRepo = await this.dataSource.manager.create(User, {
        userEmail,
        userPassword,
      });
      let userInfo = await this.dataSource.manager.save(userRepo);
      if (userInfo) {
        return new RegistrationResponseDto(true, "Registered !!! ");
      }
    } catch (error) {
      console.log(error);
      if (error.code == 23505) {
        return new RegistrationResponseDto(
          false,
          "You are registered, please login through your credentials"
        );
      } else {
        throw new BadRequestException("Unable to register");
      }
    }
  }

  async loginUser(loginUserDto: UserDto): Promise<LoginResponseDto> {
    const { userEmail, userPassword } = loginUserDto;

    try {
      const user = await this.dataSource.manager.findOneBy(User, { userEmail });
      if (user) {
        const userId = user.userId;
        if (await (userPassword === user.userPassword)) {
          const token: string = await this.jwtService.signAsync({ userId }, {secret: process.env.JWT_SECRET_KEY});
          console.log("hi")
          return new LoginResponseDto(true, 'Login Successful', token);
        } else {
          return new LoginResponseDto(false, 'Your password is incorrect');
        }
      }
      if (!user) {
        return new LoginResponseDto(
          false,
          'You are not registered. Please Register first',
        );
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Unable to log in');
    }
  }
}
