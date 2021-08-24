import { Body, Param, Controller, Get, Post, Req, Request, ParseIntPipe, Query, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatService } from './cat.service';
import { Cat } from '../../entities/cat.entity';
import { ApolloServer, gql } from 'apollo-server-express';
import * as Graphql from '@nestjs/graphql';
import { CatCreateDto } from 'src/dto/cat.create.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

/** 单个文件上传类 */
export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

/** 多个文件上传类 */
export class FilesUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  file: any[];
}

export const fileFilter = (req, file: Record<string, any>, callback: (error: Error, acceptFile: boolean) => void) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return callback(new Error('Only csv files are allowed!'), false);
  }
  callback(null, true);
};

// 获取全局配置
// console.log('process.env.DATABASE_USER', process.env.DATABASE_USER);

@Graphql.Resolver(of => Cat)
@ApiBearerAuth()
@ApiTags('app')
@Controller()
export class CatController {
  constructor(private readonly catService: CatService) {}

  /** 输出Hello World */
  @ApiOperation({ summary: '输出Hello', description: '注意，这是一段注释' })
  @Get('/getHello')
  getHello(): string {
    return this.catService.getHello();
  }

  @Graphql.Query(returns => Cat)
  @ApiOperation({ summary: '查询所有猫', description: '没错所有的' })
  @ApiQuery({ name: 'isFull', required: true, enum: ['yes', 'no'] })
  @Get('/findAll')
  async findAll(@Req() request: Request): Promise<Cat[]> {
    return await this.catService.findAll();
  }

  @Graphql.Query(returns => Cat)
  @ApiOperation({ summary: '查询所有猫', description: '没错所有的' })
  @ApiQuery({ name: 'isFull', required: true, enum: ['yes', 'no'] })
  @Get('/getPage')
  async getPage(@Req() request: Request): Promise<[Cat[], number]> {
    return await this.catService.getPage();
  }

  /** 新增猫 */
  @Graphql.ResolveField()
  @ApiOperation({ summary: '新增一只猫' })
  @Post('/addCat')
  addCat(@Body() cat: CatCreateDto): Cat {
    return this.catService.addCat(cat);
  }

  /** 删除猫 */
  @Graphql.ResolveField()
  @ApiOperation({ summary: '删除一只猫' })
  @ApiQuery({ name: 'id', type: 'string', description: '猫的Id' })
  @Delete('/removeCat')
  async removeCat(@Query() query): Promise<boolean> {
    let result: DeleteResult = await this.catService.removeCat(query.id);
    return result.affected > 0;
  }

  /** 软删除猫 */
  @Graphql.ResolveField()
  @ApiOperation({ summary: '软删除一只猫' })
  @ApiQuery({ name: 'id', type: 'string', description: '猫的Id' })
  @Delete('/softRemoveCat')
  async softRemoveCat(@Query() query): Promise<boolean> {
    let result: UpdateResult = await this.catService.softRemoveCat(query.id);
    return result.affected > 0;
  }

  @Post('uploadImage')
  @ApiOperation({ summary: '上传猫照片' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto, description: '猫的照片' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file ?? '没有文件';
  }
  
  @Post('uploadImages')
  @ApiOperation({ summary: '批量上传猫照片' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto, description: '猫的照片' })
  @UseInterceptors(FilesInterceptor('file', 10))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    return files;
  }
  
  @Post('resolveImages')
  @ApiOperation({ summary: '解析文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto, description: '文件' })
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter
  }))
  async resolveImages(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file;
  }
}