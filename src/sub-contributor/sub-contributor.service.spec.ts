import { Test, TestingModule } from '@nestjs/testing';
import { SubContributorService } from './sub-contributor.service';

describe('SubContributorService', () => {
  let service: SubContributorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubContributorService],
    }).compile();

    service = module.get<SubContributorService>(SubContributorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
