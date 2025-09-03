import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { SuperheroRepository } from './infrastructure/persistence/superhero.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Superhero } from './domain/superhero';

@Injectable()
export class SuperheroesService {
  constructor(private readonly superheroRepository: SuperheroRepository) {}

  async create(createSuperheroDto: CreateSuperheroDto): Promise<Superhero> {
    return this.superheroRepository.create({
      nickname: createSuperheroDto.nickname,
      real_name: createSuperheroDto.real_name,
      origin_description: createSuperheroDto.origin_description,
      superpowers: createSuperheroDto.superpowers,
      catch_phrase: createSuperheroDto.catch_phrase,
      images: createSuperheroDto.images ?? [],
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.superheroRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  async findById(id: Superhero['id']): Promise<Superhero> {
    const hero = await this.superheroRepository.findById(id);
    if (!hero) {
      throw new NotFoundException(`Superhero with ID ${id} not found`);
    }
    return hero;
  }

  findByIds(ids: Superhero['id'][]) {
    return this.superheroRepository.findByIds(ids);
  }

  async update(
    id: Superhero['id'],
    updateSuperheroDto: UpdateSuperheroDto,
  ): Promise<Superhero> {
    const updated = await this.superheroRepository.update(id, {
      nickname: updateSuperheroDto.nickname,
      real_name: updateSuperheroDto.real_name,
      origin_description: updateSuperheroDto.origin_description,
      superpowers: updateSuperheroDto.superpowers,
      catch_phrase: updateSuperheroDto.catch_phrase,
      images: updateSuperheroDto.images,
    });

    if (!updated) {
      throw new NotFoundException(`Superhero with ID ${id} not found`);
    }

    return updated;
  }

  remove(id: Superhero['id']): Promise<void> {
    return this.superheroRepository.remove(id);
  }
}
