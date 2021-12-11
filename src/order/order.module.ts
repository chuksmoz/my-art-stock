import { ProductModule } from './../product/product.module';
import { ProductService } from './../product/product.service';
import { OrderItem } from './../core/entities/order-item';
import { Order } from './../core/entities/order';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Cart } from 'src/core/entities/cart';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Order, OrderItem]), ProductModule],
  providers: [OrderService, ProductService],
  controllers: [OrderController],
  exports: [OrderService, TypeOrmModule],
})
export class OrderModule {}
