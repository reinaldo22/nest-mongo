import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriaDTO } from 'src/dto/categoriaDTO';
import { Categoria } from 'src/interfacesDocument/categoriaDocument';

@Injectable()
export class CategoriaService {

    constructor(@InjectModel("Categoria") private readonly categoriaSchema: Model<Categoria>) { }
    async criaCategoria(categoriaDTO: CategoriaDTO): Promise<Categoria>{

        const { categoria } = categoriaDTO;

        const categoriaExists = await this.categoriaSchema.findOne({categoria}).exec();
        if(categoriaExists){
            throw new BadRequestException(`Categoria ${categoria} já cadastrada!`);
        }

        const categoriaCariada = new this.categoriaSchema(categoriaDTO);

        return await categoriaCariada.save(); 
    }
}
