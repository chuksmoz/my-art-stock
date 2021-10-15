import { UpdateProductDto } from './../core/Dtos/productDto/update-product-dto';
import { AddProductDto } from './../core/Dtos/productDto/add-product-dto';
import { ProductService } from './product.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponse } from 'src/core/Dtos/base-response';
import {
  ProductResponse,
  ProductsResponse,
} from 'src/core/Dtos/productDto/product-response.dto';
import { throwError } from 'src/common/exception/custom-service-exception';

@ApiTags('products')
@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiOkResponse({ type: ProductsResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get('')
  async getAllProduct() {
    try {
      return this.productService.getAllProducts();
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: ProductResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get(':id')
  async getProductById(@Param('id') id: number) {
    try {
      return this.productService.getProductById(id);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: ProductResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Post('')
  async addProduct(@Body() addProductDto: AddProductDto) {
    try {
      return this.productService.addProduct(addProductDto);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: ProductResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      return this.productService.updatePoduct(id, updateProductDto);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: ProductResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Post(':id/addproductPrice')
  async addProductPrice(@Param('id') id: number, @Body() price: number) {
    try {
      return this.productService.addPoductPrice(id, price);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: BaseResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Put(':id/status')
  async updateProductStatus(@Param('id') id: number, @Body() status: boolean) {
    try {
      return this.productService.activateDeactivatePoduct(id, status);
    } catch (error) {
      throwError(error);
    }
  }
}
