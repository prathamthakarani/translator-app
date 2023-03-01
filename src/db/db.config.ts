import { DataSource } from "typeorm"
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
        entities: [logging],
        logging: true,
        synchronize: true,
    })

    return await datasource.initialize();
  }
}
]