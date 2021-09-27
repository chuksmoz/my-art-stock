import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Controller, Get } from '@nestjs/common';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async get() {
    return await this.categoryService.getAllSubCategory();
  }
}
