import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from './../base-response';
import { ProductDto } from './product-dto';
export class ProductsResponse extends BaseResponse {
  @ApiProperty({ type: [ProductDto] })
  data: ProductDto[];
}

export class ProductResponse extends BaseResponse {
  @ApiProperty({ type: ProductDto })
  data: ProductDto;
}
