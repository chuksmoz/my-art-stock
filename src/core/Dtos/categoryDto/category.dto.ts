import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

export class CategoryDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  categoryName: string;

  @ApiProperty()
  @AutoMap()
  isActive: boolean;
}

export class SubCategoryDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  categoryName: string;

  @ApiProperty()
  @AutoMap()
  categoryId?: number;

  @ApiProperty()
  @AutoMap()
  isActive: boolean;
}
