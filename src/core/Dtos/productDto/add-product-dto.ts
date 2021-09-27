import { ApiProperty } from '@nestjs/swagger';
export class AddProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  title!: string;
  @ApiProperty()
  description!: string;
  @ApiProperty()
  image!: string;
  @ApiProperty()
  price!: number;
}
