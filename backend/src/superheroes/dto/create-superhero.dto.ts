import { IsString, IsOptional, IsArray } from 'class-validator';

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
