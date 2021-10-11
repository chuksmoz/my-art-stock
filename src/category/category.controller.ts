import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
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
} from '../core/Dtos/categoryDto/create-request.dto';
import { throwError } from 'src/common/exception/custom-service-exception';
import { BaseResponse } from 'src/core/Dtos/base-response';
import {
  CategoriesResponse,
  SubCategoriesResponse,
} from 'src/core/Dtos/categoryDto/category-response.dto';

@ApiTags('category')
@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOkResponse({ type: CategoriesResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get()
  async getAllCategory(): Promise<CategoriesResponse> {
    try {
      return await this.categoryService.getAllCategory();
    } catch (error) {
      throwError(error);
    }
  }
  /* @Get(':id')
  async getCategoryById() {
    try {
      return await this.categoryService.getAllSubCategory();
    } catch (error) {
      throw new HttpException(
        { status: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  } */

  @ApiOkResponse({ type: CategoriesResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
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

  @ApiOkResponse({ type: SubCategoriesResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get(':categoryId/subCategory')
  async GetAllSubCategory(@Param('categoryId') categoryId: number) {
    try {
      return await this.categoryService.getAllSubCategory(categoryId);
    } catch (error) {
      throw new HttpException(
        { status: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
