import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  categoryName: string;
}

export class CreateSubCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  categoryId: number;
  @ApiProperty()
  @IsNotEmpty()
  subCategoryName: string;
}
