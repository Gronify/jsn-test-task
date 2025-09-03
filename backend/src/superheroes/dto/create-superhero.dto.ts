import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  real_name: string;

  @IsString()
  @IsNotEmpty()
  origin_description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  superpowers: string[];

  @IsString()
  @IsNotEmpty()
  catch_phrase: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
