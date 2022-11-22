import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {

    constructor(private readonly serviceCourses: CoursesService) { }



    @Get('list')
    findAll() {
        return this.serviceCourses.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.serviceCourses.findOne(id);
    }

    @Post()
    create(@Body() body) {
        
        return this.serviceCourses.createCourse(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return this.serviceCourses.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.serviceCourses.remove(id);
    }
}
