import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/core/Dtos/base-response';
import { CartItemDto } from './cartItem.dto';

export class CartItemsResponse extends BaseResponse {
  @ApiProperty({ type: [CartItemDto] })
  data: CartItemDto[];
}
