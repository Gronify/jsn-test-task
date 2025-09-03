import { Module } from '@nestjs/common';
import { SuperheroRepository } from '../superhero.repository';
import { SuperheroRelationalRepository } from './repositories/superhero.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperheroEntity } from './entities/superhero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuperheroEntity])],
  providers: [
    {
      provide: SuperheroRepository,
      useClass: SuperheroRelationalRepository,
    },
  ],
  exports: [SuperheroRepository],
})
export class RelationalSuperheroPersistenceModule {}
