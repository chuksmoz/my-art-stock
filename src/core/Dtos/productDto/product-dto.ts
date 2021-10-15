import { AutoMap } from '@nartc/automapper';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  @AutoMap()
  name: string;
  @ApiProperty()
  @AutoMap()
  title!: string;
  @ApiProperty()
  @AutoMap()
  description!: string;
  @ApiProperty()
  @AutoMap()
  image!: string;
  @ApiProperty()
  @AutoMap()
  price!: number;
  @ApiProperty()
  @AutoMap()
  categoryId: number;
}
