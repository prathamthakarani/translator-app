import { Body, Inject, Injectable, Req } from "@nestjs/common";
import axios from "axios";
import { TranslationDto } from "./dto/data.dto";
import { resDto } from "./dto/res/resDto";
import { logging } from "src/db/log.entity";
import { LoggerMiddleware } from "src/middleware/logger.middleware";

@Injectable()
export class TranslatorService {
  // constructor(@Inject('datasource') private datasource: DataSource){}
  // constructor(private logMiddleware: LoggerMiddleware) {}
  async translate(@Body() reqDto: TranslationDto): Promise<any> {
    const { texts, tl, sl } = reqDto;
    const apiKey = process.env.key;
    const apiHost = process.env.Host;

    const options = {
      method: "POST",
      url: process.env.url,
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost,
      },
      data: { texts: [texts], tl, sl },
    };

    // console.log(url,body)

    if (tl != sl) {
      try {
        const result = await axios.request(options);
        // console.log(result)
        return new resDto(result.data.texts, "true");
      } catch (e) {
        console.log(e.message);
      }
    } else return new resDto(texts, "tl and sl are same");
  }
}
