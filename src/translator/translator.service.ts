import { Body, Injectable } from "@nestjs/common";
import axios from "axios";
import { TranslationDto } from "./dto/data.dto";
import { resDto } from "./dto/res/resDto";

@Injectable()
export class TranslatorService {
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

    if (tl != sl) {
      try {
        const result = await axios.request(options);
        // console.log(result)
        return new resDto(result.data.texts, "text converted successfully",true);
      } catch (e) {
        console.log(e.message);
      }
    } else return new resDto(texts, "tl and sl are same",false);
  }
}
