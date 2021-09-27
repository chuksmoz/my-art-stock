import { Cart } from './../core/entities/cart';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/core/entities/users';
import { Product } from 'src/core/entities/product';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  async getCartItems(user: User): Promise<Cart[]> {
    return await this.cartRepository.find({ userId: user.id });
  }
  async itemExists(product: Product, user?: User): Promise<Cart> {
    return await this.cartRepository.findOne({
      product,
      user,
    });
  }

  async findUserProduct(cartId: number, userId: number): Promise<Cart> {
    return await this.cartRepository.findOne({
      id: cartId,
      userId,
    });
  }

  /* async removeById(product: number, user: number): Promise<DeleteResult> {
    const cartItem = await this.findUserProduct(product, user);

    if (cartItem !== undefined) {
      return await this.cartRepository.removeCartItem(cartItem);
    }
  }
  async addToCart(params: CreateCartItem, user: User): Promise<boolean> {
    const exists = await this.itemExists(params.product, user);
    if (exists) {
      await this.cartRepository.update(
        {id: exists.id},
        {quantity: exists.quantity + params.quantity},
      );

      return true;
    }

    this.cartRepository.save({
      ...params,
      user,
      product: params.product,
    });

    return true;
  } */

  /* async recalculate(params: RecalculateProps, user: User): Promise<void> {
    await this.cartRepository.update(
      {id: params.id, user},
      {quantity: params.quantity},
    );
  }

  async clearBasket(user: User): Promise<DeleteResult> {
    return await this.cartRepository.clearCartItems(user);
  } */
}
