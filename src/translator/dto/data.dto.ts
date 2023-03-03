import { ApiProperty } from '@nestjs/swagger';
import {  IsIn, IsNotEmpty, IsString } from 'class-validator';



export class TranslationDto {
  @IsIn(['en','gu','bn','bho','hi','sd','ta'])
  // @IsEnum(supportedLang)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({name:"tl",description:"Write the target language ",type:"string",required:true})
  readonly tl: string;

  @IsIn(['en','gu','bn','bho','hi','sd','ta'])
  @IsNotEmpty()
  @IsString()
  @ApiProperty({name:"sl",description:"Write the source language ",type:"string",required:true})
  readonly sl: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @ApiProperty({name:"texts",description:"Write the text that you want to convert from source to target language ",type:"string",required:true})
  readonly texts: string;
}

