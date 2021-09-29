import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class AddProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  title!: string;
  @ApiProperty()
  @IsNotEmpty()
  description!: string;
  @ApiProperty()
  @IsNotEmpty()
  imageUrl!: string;
  @ApiProperty()
  @IsNotEmpty()
  price!: number;
  @ApiProperty()
  @IsNotEmpty()
  categoryId!: number;
  @IsOptional()
  @ApiProperty({ type: [String] })
  tags: string[];
}
