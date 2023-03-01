import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TranslatorService } from './translator.service';
import { TranslatorController } from './translator.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [HttpModule, DbModule],
  providers: [TranslatorService, ],
  controllers: [TranslatorController]
})
export class TranslatorModule {}
