import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from 'src/interfacesDocument/courseDocument';
import { courseDTO } from 'src/dto/courseDTO';


@Injectable()
export class CoursesService {
    constructor(@InjectModel("Course") private readonly courseSchema: Model<Course>) { }

    async findAll() {
        return await this.courseSchema.find().exec();
    }
    async findOne(id: string) {
        const courseExistsJogador = await this.courseSchema.findById({ _id: id })
        console.log(">>>>>>>>>>>>", courseExistsJogador)
        if (!courseExistsJogador) {
            throw new HttpException(`Course ${id} não existe`, HttpStatus.NOT_FOUND);
        }
        return courseExistsJogador;
        // const courseExists = this.courses.find((course: Course) => course.id === Number(id));
        // if (!courseExists) {
        //     throw new HttpException(`Course ${id} não existe`, HttpStatus.NOT_FOUND);
        // }
        // return this.courses;
    }

    async createCourse(createCourseDTO: courseDTO): Promise<Course> {
        const jogadorCriado = new this.courseSchema(createCourseDTO)
        return await jogadorCriado.save();
    }

    async update(id: string, updateCourseDTO: courseDTO) {
        const courseExistsJogador = await this.courseSchema.findById({ _id: id })

        console.log(">>>>>>>>>>", courseExistsJogador.update());
        const retornado = await courseExistsJogador.updateOne(updateCourseDTO)
        return retornado;

    }

    async remove(id: string) {
        const courseExistsJogador = await this.courseSchema.findById({ _id: id })
        if (!courseExistsJogador) {
            throw new HttpException(`Course ${id} não existe`, HttpStatus.NOT_FOUND);
        }
        const deletado = courseExistsJogador.deleteOne({ _id: id })

        return deletado;
    }


}
