import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateCategoryDto,
  CreateSubCategoryDto,
} from '../core/Dtos/category/create-category-dto';

@ApiTags('category')
@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory() {
    try {
      return await this.categoryService.getAllSubCategory();
    } catch (error) {
      throw new HttpException(
        { status: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get(':id')
  async getCategoryById() {
    try {
      return await this.categoryService.getAllSubCategory();
    } catch (error) {
      throw new HttpException(
        { status: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async CreateCategory(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryService.addCategory(createCategoryDto);
    } catch (error) {
      throw new HttpException(
        { status: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/createSubCategory')
  async CreateSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    try {
      return await this.categoryService.addSubCategory(createSubCategoryDto);
    } catch (error) {
      throw new HttpException(
        { status: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':categoryId/subCategory')
  async GetAllSubCategory(@Param('categoryId') categoryId: number) {
    try {
      return await this.categoryService.getAllSubCategory();
    } catch (error) {
      throw new HttpException(
        { status: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
