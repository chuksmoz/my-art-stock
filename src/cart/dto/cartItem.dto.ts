import { AutoMap } from '@nartc/automapper';
import { ApiProperty } from '@nestjs/swagger';

export class CartItemDto {
  @ApiProperty()
  @AutoMap()
  id!: number;

  @ApiProperty()
  @AutoMap()
  userId!: number;

  @ApiProperty()
  @AutoMap()
  productId!: number;

  @ApiProperty()
  @AutoMap()
  quantity!: number;

  @ApiProperty()
  @AutoMap()
  title!: string;

  @ApiProperty()
  @AutoMap()
  price!: number;

  @ApiProperty()
  @AutoMap()
  created!: Date;
}
