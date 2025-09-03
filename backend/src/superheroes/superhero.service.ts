import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { SuperheroRepository } from './infrastructure/persistence/superhero.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Superhero } from './domain/superhero';
import { FilesService } from 'src/files/files.service';
@Injectable()
export class SuperheroesService {
  constructor(
    private readonly superheroRepository: SuperheroRepository,
    private readonly filesService: FilesService,
  ) {}

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

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<any[]> {
    //later
    const entities = await this.superheroRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });

    const allFileIds = entities.flatMap((e) => e.images);
    const files = await this.filesService.findByIds(allFileIds);

    return entities.map((entity) => {
      return {
        ...entity,
        images: entity.images
          .map((fileId) => {
            const file = files.find((f) => f.id === fileId);
            return file
              ? { id: file.id, path: file.path.replace(/\\/g, '/') }
              : null;
          })
          .filter(Boolean),
      };
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
    updateSuperheroDto: {
      nickname?: string;
      real_name?: string;
      origin_description?: string;
      superpowers?: string[] | string;
      catch_phrase?: string;
      images?: { id: string; path: string }[];
      removeImages?: string[];
    },
  ): Promise<any> {
    //later
    const existingHero = await this.superheroRepository.findById(id);
    if (!existingHero) {
      throw new NotFoundException(`Superhero with ID ${id} not found`);
    }

    const superpowers = Array.isArray(updateSuperheroDto.superpowers)
      ? updateSuperheroDto.superpowers
      : updateSuperheroDto.superpowers
        ? [updateSuperheroDto.superpowers]
        : existingHero.superpowers;

    const currentImages = existingHero.images ?? [];

    const filteredImages = currentImages.filter(
      (img: any) =>
        !updateSuperheroDto.removeImages?.includes(
          typeof img === 'string' ? img : img.id,
        ),
    );

    const newImages = updateSuperheroDto.images ?? [];

    const finalImages = [...filteredImages, ...newImages];
    const imageIds = finalImages.map((img: any) =>
      typeof img === 'string' ? img : img.id,
    );

    const updated = await this.superheroRepository.update(id, {
      nickname: updateSuperheroDto.nickname ?? existingHero.nickname,
      real_name: updateSuperheroDto.real_name ?? existingHero.real_name,
      origin_description:
        updateSuperheroDto.origin_description ??
        existingHero.origin_description,
      superpowers,
      catch_phrase:
        updateSuperheroDto.catch_phrase ?? existingHero.catch_phrase,
      images: imageIds,
    });

    return {
      ...updated,
      images: finalImages,
    };
  }

  remove(id: Superhero['id']): Promise<void> {
    return this.superheroRepository.remove(id);
  }
}
