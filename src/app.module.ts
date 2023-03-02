import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslatorModule } from './translator/translator.module';
import { TranslatorService } from './translator/translator.service';
import { DbModule } from './db/db.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TranslatorController } from './translator/translator.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TranslatorModule,ConfigModule.forRoot(), DbModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, TranslatorService,AuthService, JwtService],
})
// export class AppModule {}
export class AppModule  {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .forRoutes(TranslatorController);
  // }
}
