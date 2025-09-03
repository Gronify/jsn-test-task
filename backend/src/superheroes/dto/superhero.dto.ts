import { IsNotEmpty } from 'class-validator';

export class SuperheroDto {
  @IsNotEmpty()
  id: number;
}
