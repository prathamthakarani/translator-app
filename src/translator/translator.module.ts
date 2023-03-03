import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TranslatorService } from './translator.service';
import { TranslatorController } from './translator.controller';

@Module({
  imports: [HttpModule],
  providers: [TranslatorService, ],
  controllers: [TranslatorController]
})
export class TranslatorModule {}
