import { ProductService } from './product.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../core/entities/product';
import { Repository } from 'typeorm';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
