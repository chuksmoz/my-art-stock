import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: number;

  @IsOptional()
  @ApiProperty({ type: [String] })
  tags: string[];

  @ApiProperty()
  @IsNotEmpty()
  caption: string;

  @IsOptional()
  @ApiProperty()
  genre: string;

  @IsOptional()
  @ApiProperty()
  mood: string;

  @IsOptional()
  @ApiProperty()
  lyrics: string;
}
