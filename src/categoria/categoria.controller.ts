import { Controller, Body, Post, UsePipes, ValidationPipe, Get, Param, Put } from '@nestjs/common';
import { CategoriaDTO } from 'src/dto/categoriaDTO';
import { Categoria } from 'src/interfacesDocument/categoriaDocument';
import { CategoriaService } from './categoria.service';

@Controller('categoria')
export class CategoriaController {

    constructor(private readonly categoriaService: CategoriaService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criaCategoria(@Body() categoriaDTO: CategoriaDTO): Promise<Categoria>{
        return await this.categoriaService.criaCategoria(categoriaDTO);
    }
}
