import { Superhero } from '../../../../domain/superhero';
import { SuperheroEntity } from '../entities/superhero.entity';

export class SuperheroMapper {
  static toDomain(raw: SuperheroEntity): Superhero {
    const domainEntity = new Superhero();
    domainEntity.id = raw.id;
    domainEntity.nickname = raw.nickname;
    domainEntity.real_name = raw.real_name;
    domainEntity.origin_description = raw.origin_description;
    domainEntity.superpowers = raw.superpowers;
    domainEntity.catch_phrase = raw.catch_phrase;
    domainEntity.images = raw.images;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Superhero): SuperheroEntity {
    const persistenceEntity = new SuperheroEntity();
    persistenceEntity.nickname = domainEntity.nickname;
    persistenceEntity.real_name = domainEntity.real_name;
    persistenceEntity.origin_description = domainEntity.origin_description;
    persistenceEntity.superpowers = domainEntity.superpowers;
    persistenceEntity.catch_phrase = domainEntity.catch_phrase;
    persistenceEntity.images = domainEntity.images;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
