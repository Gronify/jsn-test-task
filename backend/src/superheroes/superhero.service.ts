import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { SuperheroRepository } from './infrastructure/persistence/superhero.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Superhero } from './domain/superhero';
@Injectable()
export class SuperheroesService {
  constructor(private readonly superheroRepository: SuperheroRepository) {}

  async create(
    createSuperheroDto: CreateSuperheroDto & {
      images?: { id: string; path: string }[];
    },
  ): Promise<Superhero & { images: { id: string; path: string }[] }> {
    const imageIds = createSuperheroDto.images?.map((img) => img.id) ?? [];
    console.log(createSuperheroDto.superpowers);
    const superpowers = Array.isArray(createSuperheroDto.superpowers)
      ? createSuperheroDto.superpowers
      : createSuperheroDto.superpowers
        ? [createSuperheroDto.superpowers]
        : [];

    const superhero = await this.superheroRepository.create({
      nickname: createSuperheroDto.nickname,
      real_name: createSuperheroDto.real_name,
      origin_description: createSuperheroDto.origin_description,
      superpowers: superpowers,
      catch_phrase: createSuperheroDto.catch_phrase,
      images: imageIds,
    });

    return {
      ...superhero,
      images: createSuperheroDto.images ?? [],
    };
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

  // async update(
  //   id: Superhero['id'],
  //   updateSuperheroDto: UpdateSuperheroDto & { images?: string[] },
  // ): Promise<Superhero> {
  //   const existingHero = await this.superheroRepository.findById(id);
  //   if (!existingHero) {
  //     throw new NotFoundException(`Superhero with ID ${id} not found`);
  //   }

  //   const updated = await this.superheroRepository.update(id, {
  //     nickname: updateSuperheroDto.nickname ?? existingHero.nickname,
  //     real_name: updateSuperheroDto.real_name ?? existingHero.real_name,
  //     origin_description:
  //       updateSuperheroDto.origin_description ??
  //       existingHero.origin_description,
  //     superpowers: updateSuperheroDto.superpowers ?? existingHero.superpowers,
  //     catch_phrase:
  //       updateSuperheroDto.catch_phrase ?? existingHero.catch_phrase,
  //     images:
  //       updateSuperheroDto.images && updateSuperheroDto.images.length > 0
  //         ? updateSuperheroDto.images
  //         : existingHero.images,
  //   });

  //   return updated;
  // }

  remove(id: Superhero['id']): Promise<void> {
    return this.superheroRepository.remove(id);
  }
}
