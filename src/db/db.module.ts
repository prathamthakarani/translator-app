import { Global, Module } from '@nestjs/common';
import { myDataSource } from './db.config';

@Global()
@Module({

providers:[...myDataSource],
exports:[...myDataSource, ]

})
export class DbModule {}
