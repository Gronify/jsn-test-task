import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SuperheroEntity } from '../entities/superhero.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Superhero } from '../../../../domain/superhero';
import { SuperheroRepository } from '../../superhero.repository';
import { SuperheroMapper } from '../mappers/superhero.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SuperheroRelationalRepository implements SuperheroRepository {
  constructor(
    @InjectRepository(SuperheroEntity)
    private readonly superheroRepository: Repository<SuperheroEntity>,
  ) {}

  async create(data: Superhero): Promise<Superhero> {
    const persistenceModel = SuperheroMapper.toPersistence(data);
    const newEntity = await this.superheroRepository.save(
      this.superheroRepository.create(persistenceModel),
    );
    return SuperheroMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Superhero[]> {
    const entities = await this.superheroRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SuperheroMapper.toDomain(entity));
  }

  async findById(id: Superhero['id']): Promise<NullableType<Superhero>> {
    const entity = await this.superheroRepository.findOne({
      where: { id },
    });

    return entity ? SuperheroMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Superhero['id'][]): Promise<Superhero[]> {
    const entities = await this.superheroRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SuperheroMapper.toDomain(entity));
  }

  async update(
    id: Superhero['id'],
    payload: Partial<Superhero>,
  ): Promise<Superhero> {
    const entity = await this.superheroRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.superheroRepository.save(
      this.superheroRepository.create(
        SuperheroMapper.toPersistence({
          ...SuperheroMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SuperheroMapper.toDomain(updatedEntity);
  }

  async remove(id: Superhero['id']): Promise<void> {
    await this.superheroRepository.delete(id);
  }
}
