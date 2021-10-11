import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from './../base-response';
import { CategoryDto, SubCategoryDto } from './category.dto';

export class CategoriesResponse extends BaseResponse {
  @ApiProperty({ type: [CategoryDto] })
  data: CategoryDto[];
}

export class CategoryResponse extends BaseResponse {
  @ApiProperty({ type: CategoryDto })
  data: CategoryDto;
}

export class SubCategoriesResponse extends BaseResponse {
  @ApiProperty({ type: [SubCategoryDto] })
  data: SubCategoryDto[];
}

export class SubCategoryResponse extends BaseResponse {
  @ApiProperty({ type: SubCategoryDto })
  data: SubCategoryDto;
}
