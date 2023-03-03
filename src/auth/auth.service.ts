import {  HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
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
  ) {
    // console.log(jwtService)
    // console.log()
  }

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
          "You are already registered person, please login through your credentials"
        );
      } else {
        throw new HttpException('Not Able to login please try again', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async loginUser(loginUserDto: UserDto): Promise<LoginResponseDto> {
    const { userEmail, userPassword } = loginUserDto;

    try {
      const user = await this.dataSource.manager.findOneBy(User, { userEmail });
      if (user) {
        const userId = user.userId;
        if ( (userPassword === user.userPassword)) {
          const token: string = await this.jwtService.signAsync(
            { userId },
            { secret: process.env.JWT_SECRET_KEY }
          );
          // console.log("hi");
          return new LoginResponseDto(true, "Login ho gaya bhai", token,);
        } else {
          return new LoginResponseDto(false, "Password toh shi dalo na ");
        }
      }
      if (!user) {
        return new LoginResponseDto(
          false,
          "You are not registered. Please Register first"
        );
      }
    } catch (error) {

      throw new HttpException('Not Able to login please try again', HttpStatus.BAD_REQUEST);
    }
  }
}
