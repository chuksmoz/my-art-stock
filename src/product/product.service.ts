import { customResponse } from './../core/Dtos/message-response';
import { Product } from './../core/entities/product';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageResponse } from 'src/core/Dtos/message-response';
import { AddProductDto } from 'src/core/Dtos/productDto/add-product-dto';
import { Repository } from 'typeorm';
import { UpdateProductDto } from 'src/core/Dtos/productDto/update-product-dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async getAllProducts(): Promise<MessageResponse<Product[]>> {
    const products = await this.productRepository.find();
    return customResponse.getResponse(
      true,
      'Fetched product successfully',
      products,
    );
  }

  async getProductById(id: number): Promise<MessageResponse<Product>> {
    const products = await this.productRepository.findOne(id);
    if (!products)
      return customResponse.getResponse(false, 'Product not found', null);
    return customResponse.getResponse(
      true,
      'Fetched product successfully',
      products,
    );
  }

  async addProduct(
    addProductDto: AddProductDto,
  ): Promise<MessageResponse<Product>> {
    try {
      const product: Product = new Product();
      product.image = addProductDto.image;
      product.name = addProductDto.name;
      product.description = addProductDto.description;
      product.isActive = true;
      product.price = addProductDto.price;
      product.title = addProductDto.title;
      product.createdDate = new Date();
      product.modifiedDate = new Date();
      const newProduct = await this.productRepository.create(product);
      const savedProduct = await this.productRepository.save(newProduct);
      return customResponse.getResponse(
        true,
        'Product add successfully',
        savedProduct,
      );
    } catch (error) {
      return customResponse.getResponse(
        false,
        'System glitch, contant system administrator',
        null,
      );
    }
  }
  async addPoductPrice(
    id: number,
    price: number,
  ): Promise<MessageResponse<Product>> {
    const product = await this.productRepository.findOne(id);
    if (!product)
      return customResponse.getResponse(false, 'Product not found', null);
    product.price = price;
    product.modifiedDate = new Date();
    await this.productRepository
      .createQueryBuilder()
      .update()
      .set(product)
      .where('id = :id', { id: id })
      .execute();

    return customResponse.getResponse(
      true,
      'Product price updated successfully',
      product,
    );
  }

  async activateDeactivatePoduct(
    id: number,
    activate: boolean,
  ): Promise<MessageResponse<Product>> {
    const product = await this.productRepository.findOne(id);
    if (!product)
      return customResponse.getResponse(false, 'Product not found', null);
    product.isActive = activate;
    product.modifiedDate = new Date();
    await this.productRepository
      .createQueryBuilder()
      .update()
      .set(product)
      .where('id = :id', { id: id })
      .execute();

    return customResponse.getResponse(
      true,
      'Product status updated successfully',
      product,
    );
  }

  async updatePoduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<MessageResponse<Product>> {
    const product = await this.productRepository.findOne(id);
    if (!product)
      return customResponse.getResponse(false, 'Product not found', null);
    product.image = updateProductDto.image;
    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.isActive = true;
    product.price = updateProductDto.price;
    product.title = updateProductDto.title;
    product.createdDate = new Date();
    product.modifiedDate = new Date();
    await this.productRepository
      .createQueryBuilder()
      .update()
      .set(product)
      .where('id = :id', { id: id })
      .execute();

    return customResponse.getResponse(
      true,
      'Product price updated successfully',
      product,
    );
  }
}
