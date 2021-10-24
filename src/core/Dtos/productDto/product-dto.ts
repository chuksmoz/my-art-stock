import { AutoMap } from '@nartc/automapper';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  @AutoMap()
  id: number;
  @ApiProperty()
  @AutoMap()
  name: string;
  @ApiProperty()
  @AutoMap()
  title!: string;
  @ApiProperty()
  @AutoMap()
  caption: string;
  @ApiProperty()
  @AutoMap()
  imageUrl: string;
  @ApiProperty()
  @AutoMap()
  videoUrl: string;
  @ApiProperty()
  @AutoMap()
  genre: string;
  @ApiProperty()
  @AutoMap()
  mood: string;

  @ApiProperty()
  @AutoMap()
  lyrics: string;
  @ApiProperty()
  @AutoMap()
  price: number;
  @ApiProperty()
  @AutoMap()
  categoryId: number;

  @ApiProperty()
  @AutoMap()
  isActive: boolean;

  @ApiProperty()
  @AutoMap()
  createdDate: Date;

  @ApiProperty()
  @AutoMap()
  modifiedDate: Date;
}
