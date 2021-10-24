import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartItemDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  productId: number;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantity: number;
}
