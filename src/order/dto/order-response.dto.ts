import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/core/Dtos/base-response';
import { OrderItemDto } from './order-item.dto';
import { OrderDto } from './order.dto';

export class OrdersResponse extends BaseResponse {
  @ApiProperty({ type: [OrderDto] })
  data: OrderDto[];
}

export class OrderItemsResponse extends BaseResponse {
  @ApiProperty({ type: [OrderItemDto] })
  data: OrderItemDto[];
}
