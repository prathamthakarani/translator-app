import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { TranslationDto } from './dto/data.dto';
import { TranslatorService } from './translator.service'

@Controller('translator')
export class TranslatorController {
  constructor(private readonly translateService: TranslatorService) {}

  @Post()
  async translateTexts(@Body() translationDto: TranslationDto): Promise<string> {
    return await this.translateService.translate(translationDto);
  }

}


