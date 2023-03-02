import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm"
import { User } from "./entities/user.entity";
import { logging } from "./log.entity";

export const myDataSource = [
  { 
    provide:"datasource",
    useFactory:async()=>{
      let datasource =new DataSource({
        type: "postgres",
        host: String(process.env.host),
        port: Number(process.env.port),
        username: String(process.env.username),
        password: String(process.env.password),
        database: String(process.env.database),
        entities: [logging, User],
        logging: true,
        synchronize: true,
    })

    return await datasource.initialize();
  } 
}
]