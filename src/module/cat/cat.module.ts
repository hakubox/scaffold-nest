import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { DatabaseModule } from '../../db.module';
import { CatService } from './cat.service';
import { catProviders } from './cat.providers';
import { GraphQLModule } from '@nestjs/graphql';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ConfigModule } from '@nestjs/config';

const dayjs = require('dayjs');

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
      storage: diskStorage({
        //自定义路径
        destination: `./fileUpload/${dayjs().format('YYYY-MM-DD')}`, //dayjs().format('YYYY-MM-DD')
        filename: (req, file, cb) => {
          // 自定义文件名
          // const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`;
          // return cb(null, filename);
          return  cb(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [CatController],
  providers: [
    ...catProviders,
    CatService
  ],
})
export class CatModule {}
