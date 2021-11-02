import { AutoMap } from '@nartc/automapper';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItemDto } from './order-item.dto';

export class OrderDto {
  @AutoMap()
  @ApiProperty()
  id: number;

  @AutoMap()
  @ApiProperty()
  completed: boolean;

  @AutoMap()
  @ApiProperty()
  createdAt: Date;

  @AutoMap()
  @ApiProperty()
  price: number;

  @AutoMap()
  @ApiProperty()
  userId: number;

  @AutoMap()
  @ApiProperty({ type: [OrderItemDto] })
  orderItems: OrderItemDto[];
}
