import { Test, TestingModule } from '@nestjs/testing';
import { SubContributorController } from './sub-contributor.controller';

describe('SubContributorController', () => {
  let controller: SubContributorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubContributorController],
    }).compile();

    controller = module.get<SubContributorController>(SubContributorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
