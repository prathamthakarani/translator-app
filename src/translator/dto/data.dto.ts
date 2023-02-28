import {  IsIn, IsNotEmpty, IsString } from 'class-validator';



export class TranslationDto {
  @IsIn(['en','gu','bn','bho','hi','sd','ta'])
  // @IsEnum(supportedLang)
  @IsNotEmpty()
  @IsString()
  readonly tl: string;

  @IsIn(['en','gu','bn','bho','hi','sd','ta'])
  @IsNotEmpty()
  @IsString()
  // @NotEquals()
  
  readonly sl: string;

  @IsNotEmpty()
  @IsString({ each: true })
  readonly texts: string;
}

