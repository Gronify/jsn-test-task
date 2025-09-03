import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Superhero } from '../../domain/superhero';

export abstract class SuperheroRepository {
  abstract create(
    data: Omit<Superhero, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Superhero>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Superhero[]>;

  abstract findById(id: Superhero['id']): Promise<NullableType<Superhero>>;

  abstract findByIds(ids: Superhero['id'][]): Promise<Superhero[]>;

  abstract update(
    id: Superhero['id'],
    payload: DeepPartial<Superhero>,
  ): Promise<Superhero | null>;

  abstract remove(id: Superhero['id']): Promise<void>;
}
