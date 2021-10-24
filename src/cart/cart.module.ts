import { Cart } from './../core/entities/cart';
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/core/entities/product';
import './profile/cart.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
