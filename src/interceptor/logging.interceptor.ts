import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { logging } from 'src/db/log.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class logInterceptor implements NestInterceptor {
  private logRepo: Repository<logging>;
  constructor(@Inject("datasource") private dataSource: DataSource) {}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    // console.log(request);
    const body = request.body;
    // console.log(body)
    const method = request.method;
    // console.log(method)
    const url = `${request.protocol}://${request.headers.host + request.path}`;
    const repo = this.dataSource.getRepository(logging)
    // console.log(request)
    let userId = request.user?.userId;
    const data = repo.create({
     body,url,method, userId
    })
    try {
      repo.save(data)
    } catch (error) {
      console.log(error)
    }

    // console.log(url)
    return next.handle();
  }
  
}