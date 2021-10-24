import { NOTFOUND } from './../core/utils/constant/exception-types';
import { CustomException } from './../common/exception/custom-service-exception';
import { BaseResponse } from './../core/Dtos/base-response';
import { Cart } from './../core/entities/cart';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/core/entities/users';
import { CartItemDto } from './dto/cartItem.dto';
import { Product } from 'src/core/entities/product';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { CartItemsResponse } from './dto/cart-response.dto';
import { CreateCartItemDto } from './dto/cart-request.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectMapper() private readonly mapper: AutoMapper,
  ) {}

  async getCartItems(user: User): Promise<CartItemsResponse> {
    const response = new CartItemsResponse();
    try {
      const items = await this.cartRepository.find({ userId: user.id });
      response.status = true;
      response.message = 'Cart Items fetched successfully';
      response.data = this.mapper.mapArray(items, CartItemDto, Cart);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async itemExists(productId: number, userId?: number): Promise<Cart> {
    return await this.cartRepository.findOne({
      userId,
      productId,
    });
  }

  async findUserProduct(cartId: number, userId: number): Promise<Cart> {
    return await this.cartRepository.findOne({
      id: cartId,
      userId,
    });
  }

  async removeById(product: number, user: number): Promise<BaseResponse> {
    const response = new BaseResponse();
    try {
      const cartItem = await this.findUserProduct(product, user);

      if (!cartItem) {
        throw new CustomException('Item not found in cart', NOTFOUND);
      }
      await this.cartRepository.remove(cartItem);
      response.status = true;
      response.message = 'Item removed from cart successfully';
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async addToCart(
    payload: CreateCartItemDto,
    user: User,
  ): Promise<BaseResponse> {
    const response = new BaseResponse();
    const exists = await this.itemExists(payload.productId, user.id);
    if (exists) {
      await this.cartRepository.update(
        { id: exists.id },
        { quantity: exists.quantity + payload.quantity },
      );
      response.message = 'Product added to cart successfully';
      response.status = true;
      return response;
    }

    const product = await this.productRepository.findOne(payload.productId);
    if (!product) {
      throw new CustomException('Product not found', NOTFOUND);
    }

    const newCart = new Cart();
    newCart.productId = payload.productId;
    newCart.userId = user.id;
    newCart.quantity = payload.quantity;
    newCart.price = product.price;

    this.cartRepository.save(newCart);

    return response;
  }

  /* async recalculate(params: RecalculateProps, user: User): Promise<void> {
    await this.cartRepository.update(
      { id: params.id, user },
      { quantity: params.quantity },
    );
  } */

  async clearBasket(user: User): Promise<BaseResponse> {
    const response = new BaseResponse();
    try {
      await this.cartRepository
        .createQueryBuilder()
        .delete()
        .where({ userId: user.id })
        .execute();
      response.message = 'Cart deleted successfully';
      response.status = true;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
