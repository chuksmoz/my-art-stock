import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class AddProductDto {
  @ApiProperty()
  title: string;
  @ApiProperty({ type: 'string' })
  //@IsNotEmpty()
  image: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  video: string;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: number;

  @IsOptional()
  @ApiProperty({ type: [String], required: false })
  tags: string[];

  @ApiProperty()
  @IsNotEmpty()
  caption: string;

  @IsOptional()
  @ApiProperty({ required: false })
  genre: string;

  @IsOptional()
  @ApiProperty({ required: false })
  mood: string;

  @IsOptional()
  @ApiProperty({ required: false })
  lyrics: string;
}
