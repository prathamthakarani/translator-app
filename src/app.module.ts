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

@Module({
  imports: [TranslatorModule,ConfigModule.forRoot(), DbModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, TranslatorService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(TranslatorController);
  }
}
