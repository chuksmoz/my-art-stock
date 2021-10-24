import { CartItemDto } from './../dto/cartItem.dto';
import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';
import { Cart } from 'src/core/entities/cart';

@Profile()
export class CartProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Cart, CartItemDto).reverseMap();
  }
}
