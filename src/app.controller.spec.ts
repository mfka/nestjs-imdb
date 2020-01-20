import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe('Testing app controller', () => {
    it('Return health check response', async () => {
      expect(await appController.healthCheck()).toEqual({ health: true });
    });
  });
});
