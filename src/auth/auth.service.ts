import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/db/entities/user.entity';
import { LoginResponseDto } from 'src/translator/dto/res/login.res.dto';
import { RegistrationResponseDto } from 'src/translator/dto/res/reg.res.dto';
import { UserDto } from 'src/translator/dto/user.dto';
import { DataSource } from 'typeorm';
// import {JwtService} from 'nestjs/jwt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @Inject("datasource") private dataSource: DataSource, 
    private jwtService: JwtService,
    ) {}

    async registerUser(
      registerUserDto: UserDto,
    ): Promise<RegistrationResponseDto> {
      const { userEmail, userPassword } = registerUserDto;
      console.log(userEmail + userPassword)
      try {
        const userRepo = await this.dataSource.manager.create(User, {
          userEmail,
          userPassword,
        });
        let userInfo = await this.dataSource.manager.save(userRepo)
        if (userInfo) {
          return new RegistrationResponseDto(true, 'Registration successful');
        }
      } catch (error) {
        console.log(error)
        if (error.code == 23505) {
          return new RegistrationResponseDto(
            false,
            'You are already registered! Please login',
          );
        } else {
          console.log(error);
          throw new BadRequestException('Unable to register you');
        }
      }
    }

    // async loginUser(loginUserDto: UserDto): Promise<LoginResponseDto> {
    //   const { userEmail, userPassword } = loginUserDto;
  
    //   try {
    //     const user = await this.dataSource.manager.findOneBy(User, { userEmail });
    //     if (user) {
    //       const userId = user.userId;
    //       if (await (userPassword === user.userPassword)) {
    //         const token: string = await this.jwtService.signAsync({ userId });
    //         return new LoginResponseDto(true, 'Login Successful', token);
    //       } else {
    //         return new LoginResponseDto(false, 'Your password is incorrect');
    //       }
    //     }
    //     if (!user) {
    //       return new LoginResponseDto(
    //         false,
    //         'You are not registered. Please Register',
    //       );
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     throw new BadRequestException('Unable to log you in');
    //   }
    // }

}
