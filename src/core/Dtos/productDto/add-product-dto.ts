import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class AddProductDto {
  @ApiProperty()
  title: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  image: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  video: string;

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

export class File {
  name: string;
  maxCount: number;
}
