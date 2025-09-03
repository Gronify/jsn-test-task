import { IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllSuperheroesDto {
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  page?: number;

  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  limit?: number;
}
