import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'
dotenv.config()
//  mongodb://balta:e296cd9f@localhost:27017/admin
// localhost:27017/test-mongo
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATA_MONGO),
    CoursesModule
  ],
})
export class AppModule { }
