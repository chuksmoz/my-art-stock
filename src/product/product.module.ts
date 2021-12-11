import { CloudinaryModule } from './../cloudinary/cloudinary.module';
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { Product } from './../core/entities/product';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import '../core/profiles/product.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CloudinaryModule],
  providers: [ProductService, CloudinaryService],
  controllers: [ProductController],
  exports: [ProductService, TypeOrmModule, CloudinaryModule],
})
export class ProductModule {}
