import { UpdateProductDto } from './../core/Dtos/productDto/update-product-dto';
import { AddProductDto } from './../core/Dtos/productDto/add-product-dto';
import { ProductService } from './product.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('')
  async getAllProduct() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Post('')
  async addProduct(@Body() addProductDto: AddProductDto) {
    return this.productService.addProduct(addProductDto);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updatePoduct(id, updateProductDto);
  }
  @Post(':id/addproductPrice')
  async addProductPrice(@Param('id') id: number, @Body() price: number) {
    return this.productService.addPoductPrice(id, price);
  }

  @Put(':id/status')
  async updateProductStatus(@Param('id') id: number, @Body() status: boolean) {
    return this.productService.activateDeactivatePoduct(id, status);
  }
}
