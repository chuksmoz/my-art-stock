import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/core/Dtos/base-response';
import { OrderDto } from './order.dto';

export class OrdersResponse extends BaseResponse {
  @ApiProperty({ type: [OrderDto] })
  data: OrderDto[];
}
