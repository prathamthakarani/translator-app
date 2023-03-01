import { ApiProperty } from '@nestjs/swagger';
import {  IsIn, IsNotEmpty, IsString } from 'class-validator';



export class TranslationDto {
  @IsIn(['en','gu','bn','bho','hi','sd','ta'])
  // @IsEnum(supportedLang)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({name:"Target Language",description:"Write the target language ",type:"string",required:true})
  readonly tl: string;

  @IsIn(['en','gu','bn','bho','hi','sd','ta'])
  @IsNotEmpty()
  @IsString()
  @ApiProperty({name:"Source Language",description:"Write the source language ",type:"string",required:true})
  readonly sl: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @ApiProperty({name:"text",description:"Write the text that you want to convert from source to target language ",type:"string",required:true})
  readonly texts: string;
}

