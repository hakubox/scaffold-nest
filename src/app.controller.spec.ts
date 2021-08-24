import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './module/cat/cat.controller';
import { CatService } from './module/cat/cat.service';

describe('AppController', () => {
  let appController: CatController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [CatService],
    }).compile();

    appController = app.get<CatController>(CatController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
