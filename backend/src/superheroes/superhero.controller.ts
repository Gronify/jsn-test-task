import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Query,
  Body,
  UploadedFiles,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SuperheroesService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { Superhero } from './domain/superhero';
import { FilesInterceptor } from '@nestjs/platform-express';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSuperheroesDto } from './dto/find-all-superheros.dto';
import { InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { FilesLocalService } from 'src/files/infrastructure/uploader/local/files.service';

@Controller({ path: 'superheroes', version: '1' })
export class SuperheroesController {
  constructor(
    private readonly superheroesService: SuperheroesService,
    private readonly filesService: FilesLocalService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(@Body() createSuperheroDto, @UploadedFiles() images) {
    const uploadedImages = images
      ? await Promise.all(images.map((file) => this.filesService.create(file)))
      : [];
    const files = uploadedImages.map((res) => ({
      id: res.file.id,
      path: res.file.path.replace(/\\/g, '/'),
    }));

    return this.superheroesService.create({
      ...createSuperheroDto,
      images: files,
    });
  }

  @Get()
  async findAll(
    @Query() query: FindAllSuperheroesDto,
  ): Promise<InfinityPaginationResponseDto<Superhero>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) limit = 50;

    return infinityPagination(
      await this.superheroesService.findAllWithPagination({
        paginationOptions: { page, limit },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.superheroesService.findById(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async update(
    @Param('id') id: number,
    @Body() updateDto: any, //later
    @UploadedFiles() images?: Express.Multer.File[],
  ) {
    const uploadedImages = images
      ? await Promise.all(images.map((file) => this.filesService.create(file)))
      : [];

    const files = uploadedImages.map((res) => ({
      id: res.file.id,
      path: res.file.path.replace(/\\/g, '/'),
    }));

    return this.superheroesService.update(id, {
      ...updateDto,
      images: files,
      removeImages: updateDto.removeImages ?? [],
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.superheroesService.remove(id);
  }
}
