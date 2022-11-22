import {
  ArrayMinSize,
  IsArray,
    IsNotEmpty,
    IsString
  } from 'class-validator';
import { Evento } from 'src/interfacesDocument/categoriaDocument';

export class CategoriaDTO {

  @IsString()
  @IsNotEmpty()
  readonly categoria: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<Evento>

}