import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FileRepository } from '../../persistence/file.repository';
import { AllConfigType } from '../../../../config/config.type';
import { FileType } from '../../../domain/file';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesLocalService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly fileRepository: FileRepository,
  ) {}

  async create(file: Express.Multer.File): Promise<{ file: FileType }> {
    if (!file) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          file: 'selectFile',
        },
      });
    }

    if (file.path) {
      return {
        file: await this.fileRepository.create({
          path: `/${this.configService.get('app.apiPrefix', {
            infer: true,
          })}/v1/${file.path}`,
        }),
      };
    } else {
      const uploadsDir = path.resolve(process.cwd(), 'files');
      await fs.promises.mkdir(uploadsDir, { recursive: true });

      const fileName = `${Date.now()}-${file.originalname}`;
      const finalPath = path.join(uploadsDir, fileName);

      await fs.promises.writeFile(finalPath, file.buffer);

      return {
        file: await this.fileRepository.create({
          path: `/${this.configService.get('app.apiPrefix', {
            infer: true,
          })}/v1/${path.join('files', fileName)}`,
        }),
      };
    }
  }
}
