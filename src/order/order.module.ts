import { OrderItem } from './../core/entities/order-item';
import { Order } from './../core/entities/order';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Cart } from 'src/core/entities/cart';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Order, OrderItem])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
