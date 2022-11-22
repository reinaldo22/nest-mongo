import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from 'src/schema/CategoriaSchema';

@Module({
  imports:[MongooseModule.forFeature([{name: "Categoria", schema: CategoriaSchema}])],
  providers: [CategoriaService],
  controllers: [CategoriaController]
})
export class CategoriaModule {}
