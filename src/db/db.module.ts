import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { myDataSource } from './db.config';
// import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
imports: [],
providers:[...myDataSource],
exports:[...myDataSource ]

})
export class DbModule {}
