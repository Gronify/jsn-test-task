import { Allow } from 'class-validator';
import { Transform } from 'class-transformer';
import appConfig from '../../config/app.config';
import fileConfig from '../config/file.config';
import { AppConfig } from '../../config/app-config.type';
import { FileConfig, FileDriver } from '../config/file-config.type';

export class FileType {
  @Allow()
  id: string;

  @Transform(
    ({ value }) => {
      const config = fileConfig() as FileConfig;
      if (config.driver === FileDriver.LOCAL) {
        const appConf = appConfig() as AppConfig;
        return appConf.backendDomain + value; // формируем URL для локального файла
      }
      return value;
    },
    { toPlainOnly: true },
  )
  path: string;
}
