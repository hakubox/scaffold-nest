import { Inject, Injectable } from '@nestjs/common';
import { CatCreateDto } from 'src/dto/cat.create.dto';
import { Repository } from 'typeorm';
import { Cat } from '../../entities/cat.entity';

@Injectable()
export class CatService {
  constructor(
    @Inject('cat_repository')
    private photoRepository: Repository<Cat>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<Cat[]> {
    let cats = await this.photoRepository.find();
    console.log('cats', cats);
    return cats;
  }

  async getPage(): Promise<[Cat[], number]> {
    let cats = await this.photoRepository.findAndCount({
      skip: 0,
      take: 10
    });
    console.log('cats', cats);
    return cats;
  }
  

  addCat(cat: CatCreateDto): Cat {
    return this.photoRepository.create(cat);
  }

  removeCat(catId: string) {
    return this.photoRepository.delete(catId);
  }

  softRemoveCat(catId: string) {
    return this.photoRepository.softDelete(catId);
  }
}