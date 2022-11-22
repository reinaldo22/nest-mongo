import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaModule } from './categoria/categoria.module';
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATA_MONGO),
    CoursesModule,
    CategoriaModule
  ],
})
export class AppModule { }
