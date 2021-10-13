import { NOTFOUND, BADREQUEST } from './../core/utils/constant/exception-types';
import { CustomException } from './../common/exception/custom-service-exception';
import {
  SubCategoriesResponse,
  SubCategoryResponse,
} from './../core/Dtos/categoryDto/category-response.dto';
import {
  CategoryDto,
  SubCategoryDto,
} from './../core/Dtos/categoryDto/category.dto';
import { Category } from './../core/entities/category';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCategoryDto,
  CreateSubCategoryDto,
} from 'src/core/Dtos/categoryDto/create-request.dto';
import { IsNull, Repository } from 'typeorm';
import {
  CategoriesResponse,
  CategoryResponse,
} from 'src/core/Dtos/categoryDto/category-response.dto';
import { AutoMapper } from '@nartc/automapper';
import { InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectMapper() private readonly mapper: AutoMapper,
  ) {}

  async addCategory(payload: CreateCategoryDto): Promise<CategoryResponse> {
    const response = new CategoryResponse();
    const existingCategory = await this.categoryRepository.findOne({
      where: { categoryName: payload.categoryName },
    });
    if (existingCategory) {
      throw new Error('Category already exist');
    }
    const category = new Category();
    category.categoryName = payload.categoryName;
    category.isActive = true;
    const newCategory = await this.categoryRepository.save(category);
    const categoryDto = this.mapper.map(newCategory, CategoryDto, Category);

    response.status = true;
    response.message = 'Category added successfully';
    response.data = categoryDto;
    return response;
  }

  async addSubCategory(
    payload: CreateSubCategoryDto,
  ): Promise<SubCategoryResponse> {
    const response = new SubCategoryResponse();
    const existingCategory = await this.categoryRepository.findOne(
      payload.categoryId,
    );
    if (!existingCategory) {
      throw new CustomException('Category not found', NOTFOUND);
    }
    const existingSubCategory = await this.categoryRepository.findOne({
      where: {
        categoryName: payload.subCategoryName,
        id: payload.categoryId,
      },
    });
    if (existingSubCategory) {
      throw new CustomException('Category already exist', BADREQUEST);
    }
    const category = new Category();
    category.categoryName = payload.subCategoryName;
    category.categoryId = payload.categoryId;
    category.isActive = true;
    const newSubCategory = await this.categoryRepository.save(category);

    const subCategoryDto = this.mapper.map(
      newSubCategory,
      SubCategoryDto,
      Category,
    );

    response.status = true;
    response.message = 'Sub Category added successfully';
    response.data = subCategoryDto;

    return response;
  }

  async getAllCategory(): Promise<CategoriesResponse> {
    const response = new CategoriesResponse();
    try {
      const categories = await this.categoryRepository.find({
        where: { categoryId: IsNull() },
      });

      const categoriesDto = this.mapper.mapArray(
        categories,
        CategoryDto,
        Category,
      );
      response.message = 'Categories fetched successfully';
      response.status = true;
      response.data = categoriesDto;
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSubCategory(categoryId: number): Promise<SubCategoriesResponse> {
    const response = new SubCategoriesResponse();
    const category = await this.categoryRepository.find({
      where: { categoryId: categoryId },
    });

    const categoryDto = this.mapper.mapArray(
      category,
      SubCategoryDto,
      Category,
    );
    response.status = true;
    response.message = 'Category fetch successfully';
    response.data = categoryDto;
    return response;
  }
}
