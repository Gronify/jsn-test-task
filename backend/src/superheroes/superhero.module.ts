import { Module } from '@nestjs/common';
import { SuperheroesService } from './superhero.service';
import { SuperheroesController } from './superhero.controller';
import { RelationalSuperheroPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [RelationalSuperheroPersistenceModule, FilesModule],
  controllers: [SuperheroesController],
  providers: [SuperheroesService],
  exports: [SuperheroesService, RelationalSuperheroPersistenceModule],
})
export class SuperheroesModule {}
