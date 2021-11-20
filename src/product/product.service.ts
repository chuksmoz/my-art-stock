import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { BaseResponse } from './../core/Dtos/base-response';
import { NOTFOUND } from './../core/utils/constant/exception-types';
import { CustomException } from './../common/exception/custom-service-exception';
import { ProductDto } from './../core/Dtos/productDto/product-dto';
import { Product } from './../core/entities/product';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddProductDto } from 'src/core/Dtos/productDto/add-product-dto';
import { Repository } from 'typeorm';
import { UpdateProductDto } from 'src/core/Dtos/productDto/update-product-dto';
import {
  ProductResponse,
  ProductsResponse,
} from 'src/core/Dtos/productDto/product-response.dto';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class ProductService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectMapper() private readonly mapper: AutoMapper,
  ) {}
  async getAllProducts(): Promise<ProductsResponse> {
    const response = new ProductsResponse();
    try {
      const products = await this.productRepository.find();
      response.message = 'Fetched product successfully';
      response.status = true;
      response.data = this.mapper.mapArray(products, ProductDto, Product);
      return response;
    } catch (error) {
      console.log(error);
      //throw CustomException(error.message, error.n)
      throw new Error('System glitch, contact system administrator');
    }
  }

  async getProductById(id: number): Promise<ProductResponse> {
    const response = new ProductResponse();
    try {
      const products = await this.productRepository.findOne(id);
      if (!products) throw new CustomException(NOTFOUND, 'Product not found');
      response.message = 'Fetched product successfully';
      response.status = true;
      response.data = this.mapper.map(products, ProductDto, Product);
      return response;
    } catch (error) {
      throw new Error('System glitch, contact system administrator');
    }
  }

  async addProduct(
    payload: AddProductDto,
    image: Express.Multer.File,
    video: Express.Multer.File,
  ): Promise<ProductResponse> {
    const response = new ProductResponse();
    try {
      //const cloudResponse = await this.cloudinaryService.uploadImage(image);
      const product: Product = new Product();
      product.lyrics = payload.lyrics;
      product.caption = payload.caption;
      product.mood = payload.mood;
      product.genre = payload.genre;
      product.isActive = true;
      product.title = payload.title;
      product.isDeleted = false;
      product.categoryId = payload.categoryId;
      product.createdDate = new Date();
      product.modifiedDate = new Date();

      const cloudImageResponse = await this.cloudinaryService.uploadImage(
        image,
      );
      //console.log(cloudImageResponse);
      product.imageUrl = cloudImageResponse.secure_url;
      if (video != null) {
        console.log('am inside');
        const cloudvideoResponse = await this.cloudinaryService.uploadImage(
          video,
        );
        product.videoUrl = cloudvideoResponse.secure_url;
        //console.log(cloudvideoResponse);
      }
      const newProduct = await this.productRepository.create(product);
      const savedProduct = await this.productRepository.save(newProduct);

      response.message = 'Product added successfully';
      response.status = true;
      response.data = this.mapper.map(savedProduct, ProductDto, Product);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error('System glitch, contact system administrator');
    }
  }

  /* async addProduct(payload: AddProductDto): Promise<ProductResponse> {
    const response = new ProductResponse();
    try {
      //const cloudResponse = await this.cloudinaryService.uploadImage(image);
      const product: Product = new Product();
      product.lyrics = payload.lyrics;
      product.caption = payload.caption;
      product.mood = payload.mood;
      product.genre = payload.genre;
      product.isActive = true;
      product.title = payload.title;
      product.isDeleted = false;
      product.categoryId = payload.categoryId;
      product.createdDate = new Date();
      product.modifiedDate = new Date();

      const cloudImageResponse = await this.cloudinaryService.uploadImage(
        payload.image,
      );
      //console.log(cloudImageResponse);
      product.imageUrl = cloudImageResponse.secure_url;
      if (video != null) {
        console.log('am inside');
        const cloudvideoResponse = await this.cloudinaryService.uploadImage(
          video,
        );
        product.videoUrl = cloudvideoResponse.secure_url;
        //console.log(cloudvideoResponse);
      }
      const newProduct = await this.productRepository.create(product);
      const savedProduct = await this.productRepository.save(newProduct);

      response.message = 'Product added successfully';
      response.status = true;
      response.data = this.mapper.map(savedProduct, ProductDto, Product);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error('System glitch, contact system administrator');
    }
  } */

  async addPoductPrice(id: number, price: number): Promise<ProductResponse> {
    try {
      const response = new ProductResponse();
      const product = await this.productRepository.findOne(id);
      if (!product) throw new CustomException('Product not found', NOTFOUND);
      product.price = price;
      product.modifiedDate = new Date();
      await this.productRepository
        .createQueryBuilder()
        .update()
        .set(product)
        .where('id = :id', { id: id })
        .execute();

      response.message = 'Product price updated successfully';
      response.status = true;
      response.data = this.mapper.map(product, ProductDto, Product);
      return response;
    } catch (error) {
      throw new Error('System glitch, contact system administrator');
    }
  }

  async activateDeactivatePoduct(
    id: number,
    activate: boolean,
  ): Promise<BaseResponse> {
    try {
      const response = new BaseResponse();
      const product = await this.productRepository.findOne(id);
      if (!product) throw new CustomException('Product not found', NOTFOUND);
      product.isActive = activate;
      product.modifiedDate = new Date();
      await this.productRepository
        .createQueryBuilder()
        .update()
        .set(product)
        .where('id = :id', { id: id })
        .execute();

      response.status = true;
      response.message = 'Product status updated successfully';
      return response;
    } catch (error) {
      throw new Error('System glitch, contact system administrator');
    }
  }

  async updatePoduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductResponse> {
    const response = new ProductResponse();
    const product = await this.productRepository.findOne(id);
    if (!product) throw new CustomException('Product not found', NOTFOUND);
    product.lyrics = updateProductDto.lyrics;
    product.caption = updateProductDto.caption;
    product.mood = updateProductDto.mood;
    product.genre = updateProductDto.genre;
    product.isActive = true;
    product.title = updateProductDto.title;
    product.tags = updateProductDto.tags;
    product.modifiedDate = new Date();
    await this.productRepository
      .createQueryBuilder()
      .update()
      .set(product)
      .where('id = :id', { id: id })
      .execute();

    response.message = 'Product price updated successfully';
    response.status = true;
    response.data = this.mapper.map(product, ProductDto, Product);
    return response;
  }
  async upload(file: Express.Multer.File) {
    const response = await this.cloudinaryService.uploadImage(file);
    console.log(response);
  }
}
