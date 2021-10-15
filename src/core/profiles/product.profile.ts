import { ProductDto } from './../Dtos/productDto/product-dto';
import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';
import { Product } from '../entities/product';

@Profile()
export class ProductProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    //mapper.createMap(CreateUserRequest, User);
    mapper.createMap(Product, ProductDto).reverseMap();
  }
}
