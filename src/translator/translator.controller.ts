import { Body, Controller, Get, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TranslationDto } from './dto/data.dto';
import { TranslatorService } from './translator.service'
import { AuthGuard } from '@nestjs/passport';
import { logInterceptor } from 'src/interceptor/logging.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('translator')
@UseInterceptors(logInterceptor)
export class TranslatorController {
  constructor(private readonly translateService: TranslatorService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  async translateTexts(@Body() translationDto: TranslationDto): Promise<string> {
    return await this.translateService.translate(translationDto);
  }
}


