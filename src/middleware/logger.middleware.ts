import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { logging } from "src/db/log.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logRepo: Repository<logging>;

  constructor(@Inject("datasource") private dataSource: DataSource) {}
  use(req: Request, res: Response, next: NextFunction) {
    // console.log(req.body1);

    const body = req.body;
    // console.log(req.method)
    const method = req.method;
    const url = `${req.protocol}://${req.headers.host + req.path}`;
    const repo = this.dataSource.getRepository(logging)
    const data = repo.create({
     body,url,method 
    })
    try {
      repo.save(data)
    } catch (error) {
      console.log(error)
    }


    next();
  }
}
