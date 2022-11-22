import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriaDTO } from 'src/dto/categoriaDTO';
import { courseDTO } from 'src/dto/courseDTO';
import { Categoria } from 'src/interfacesDocument/categoriaDocument';

@Injectable()
export class CategoriaService {

    constructor(@InjectModel("Categoria") private readonly categoriaSchema: Model<Categoria>) { }
    async criaCategoria(categoriaDTO: CategoriaDTO): Promise<Categoria> {

        const { categoria } = categoriaDTO;

        const categoriaExists = await this.categoriaSchema.findOne({ categoria }).exec();
        if (categoriaExists) {
            throw new BadRequestException(`Categoria ${categoria} já cadastrada!`);
        }

        const categoriaCariada = new this.categoriaSchema(categoriaDTO);

        return await categoriaCariada.save();
    }

    async findAllCategoria(): Promise<Array<Categoria>> {
        return await this.categoriaSchema.find().populate('courses').exec()
    }

    async findAllCategoriaId(categoria: string): Promise<Categoria> {
        const categoriaExists = await this.categoriaSchema.findOne({ categoria }).exec();

        if (!categoriaExists) {
            throw new BadRequestException(`Categoria ${categoria} não encontrada!`);
        }

        return categoriaExists;
    }

    async atualizaCategoria(categoria: string, categoriaDTO: CategoriaDTO): Promise<void> {
        const categoriaExists = await this.categoriaSchema.findOne({ categoria }).exec();
        if (!categoriaExists) {
            throw new NotFoundException(`Categoria ${categoria} não encontrada!`)
        }

        await this.categoriaSchema.findOneAndUpdate({ categoria }, { $set: categoriaDTO });
        
    }

    async addCourseCategoria(categoria:string, courses: courseDTO) {
        
        const categoriaExists = await this.categoriaSchema.findOne({ categoria }).exec();
        if (!categoriaExists) {
            throw new NotFoundException(`Categoria ${categoria} não encontrada!`)
        }

        await this.categoriaSchema.findOneAndUpdate({ categoria }, { $set: courses });

    }
}
