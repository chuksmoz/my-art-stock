import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class AddProductDto {
  @ApiProperty()
  title: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  //@IsNotEmpty()
  image: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  video: Express.Multer.File;

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
