import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {  JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DbModule } from 'src/db/db.module';
import { JwtStrategy } from './jwtStartegy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '1h' },
      }),
      // inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [ AuthService,JwtService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
