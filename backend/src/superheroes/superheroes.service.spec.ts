import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroRepository } from './infrastructure/persistence/superhero.repository';
import { FilesService } from 'src/files/files.service';
import { NotFoundException } from '@nestjs/common';
import { SuperheroesService } from './superhero.service';

describe('SuperheroesService', () => {
  let service: SuperheroesService;
  let repo: jest.Mocked<SuperheroRepository>;
  // let files: jest.Mocked<FilesService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperheroesService,
        {
          provide: SuperheroRepository,
          useValue: {
            create: jest.fn(),
            findAllWithPagination: jest.fn(),
            findById: jest.fn(),
            findByIds: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: FilesService,
          useValue: {
            findByIds: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(SuperheroesService);
    repo = module.get(SuperheroRepository);
    // files = module.get(FilesService);
  });

  it('should create superhero with normalized superpowers', async () => {
    repo.create.mockResolvedValue({
      id: 1,
      nickname: 'Hero',
      real_name: 'John',
      origin_description: 'Origin',
      superpowers: ['Fly'],
      catch_phrase: 'Boom',
      images: ['mock'],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const dto = {
      nickname: 'Hero',
      real_name: 'John',
      origin_description: 'Origin',
      superpowers: 'Fly',
      catch_phrase: 'Boom',
      images: [{ id: 'mock', path: '/img.png' }],
    };

    const result = await service.create(dto);

    expect(repo.create).toHaveBeenCalledWith({
      nickname: 'Hero',
      real_name: 'John',
      origin_description: 'Origin',
      superpowers: ['Fly'],
      catch_phrase: 'Boom',
      images: ['mock'],
    });

    expect(result.images).toEqual([{ id: 'mock', path: '/img.png' }]);
  });

  it('should throw NotFoundException if hero not found', async () => {
    repo.findById.mockResolvedValue(null);

    await expect(service.findById(99)).rejects.toThrow(NotFoundException);
  });
});
