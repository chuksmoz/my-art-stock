import { Category } from './../core/entities/category';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCategoryDto,
  CreateSubCategoryDto,
} from 'src/core/Dtos/category/create-category-dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async addCategory(creatCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findOne({
      where: { categoryName: creatCategoryDto.categoryName },
    });
    if (existingCategory) {
      throw new Error('Category already exist');
    }
    const category = new Category();
    category.categoryName = creatCategoryDto.categoryName;
    const newCategory = await this.categoryRepository.save(category);
    return {
      status: true,
      message: 'Category added successfully',
      data: newCategory,
    };
  }

  async addSubCategory(creatSubCategoryDto: CreateSubCategoryDto) {
    const existingCategory = await this.categoryRepository.findOne(
      creatSubCategoryDto.categoryId,
    );
    if (existingCategory) {
      throw new Error('Category not found');
    }
    const existingSubCategory = await this.categoryRepository.findOne({
      where: {
        categoryName: creatSubCategoryDto.subCategoryName,
        id: creatSubCategoryDto.categoryId,
      },
    });
    if (existingSubCategory) {
      throw new Error('Category already exist');
    }
    const category = new Category();
    category.categoryName = creatSubCategoryDto.subCategoryName;
    category.categoryId = creatSubCategoryDto.categoryId;
    const newCategory = await this.categoryRepository.save(category);
    return {
      status: true,
      message: 'Sub Category added successfully',
      data: newCategory,
    };
  }

  async getAllCategory() {
    const category = await this.categoryRepository.find({
      where: { parentId: null },
    });
    return {
      status: true,
      message: 'Category fetch successfully',
      data: category,
    };
  }

  async getAllSubCategory() {
    const category = await this.categoryRepository
      .createQueryBuilder()
      .leftJoinAndSelect('category.categoryId', 'category')
      .getMany();

    return {
      status: true,
      message: 'Category fetch successfully',
      data: category,
    };
  }
}
