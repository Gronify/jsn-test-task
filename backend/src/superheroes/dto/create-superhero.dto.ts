import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

//maybe later
export class CreateSuperheroDto {
  @IsString() nickname: string;
  @IsString() real_name: string;
  @IsString() origin_description: string;
  superpowers: string[] | string;
  @IsString() catch_phrase: string;
  @IsOptional()
  @IsArray()
  images?: any[];
}
