import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TranslationDto } from './dto/data.dto';
import { TranslatorService } from './translator.service'
import { AuthGuard } from '@nestjs/passport';

@Controller('translator')
export class TranslatorController {
  constructor(private readonly translateService: TranslatorService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async translateTexts(@Body() translationDto: TranslationDto): Promise<string> {
    return await this.translateService.translate(translationDto);
  }
}


