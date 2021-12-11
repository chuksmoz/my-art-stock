import { OrderItemDto } from './../dto/order-item.dto';
import { OrderItem } from './../../core/entities/order-item';
import { Order } from './../../core/entities/order';
import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';
import { OrderDto } from '../dto/order.dto';

@Profile()
export class OrderProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Order, OrderDto).reverseMap();
    mapper.createMap(OrderItem, OrderItemDto).reverseMap();
  }
}
