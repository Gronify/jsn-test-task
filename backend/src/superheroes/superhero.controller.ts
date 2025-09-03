import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SuperheroesService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';

import { Superhero } from './domain/superhero';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSuperheroesDto } from './dto/find-all-superheros.dto';
import { InfinityPaginationResponseDto } from 'src/utils/dto/infinity-pagination-response.dto';

@Controller({
  path: 'superheroes',
  version: '1',
})
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superheroesService.create(createSuperheroDto);
  }

  @Get()
  async findAll(
    @Query() query: FindAllSuperheroesDto,
  ): Promise<InfinityPaginationResponseDto<Superhero>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.superheroesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.superheroesService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
  ) {
    return this.superheroesService.update(id, updateSuperheroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.superheroesService.remove(id);
  }
}
