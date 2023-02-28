import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslatorModule } from './translator/translator.module';
import { TranslatorService } from './translator/translator.service';
import { DbModule } from './db/db.module';

@Module({
  imports: [TranslatorModule,ConfigModule.forRoot(), DbModule],
  controllers: [AppController],
  providers: [AppService, TranslatorService],
})
export class AppModule {}
