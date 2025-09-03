import { Module } from '@nestjs/common';
import databaseConfig from './database/config/database.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SuperheroesModule } from './superheroes/superhero.module';
import { FilesModule } from './files/files.module';
import appConfig from './config/app.config';
import fileConfig from './files/config/file.config';

const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});
@Module({
  imports: [
    SuperheroesModule,
    FilesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
  ],
})
export class AppModule {}
