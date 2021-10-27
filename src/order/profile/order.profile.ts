import { Order } from './../../core/entities/order';
import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';
import { OrderDto } from '../dto/order.dto';

@Profile()
export class OrderProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Order, OrderDto).reverseMap();
  }
}
