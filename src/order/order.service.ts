import { BADREQUEST } from './../core/utils/constant/exception-types';
import { CustomException } from 'src/common/exception/custom-service-exception';
import { BaseResponse } from './../core/Dtos/base-response';
import { OrderItem } from './../core/entities/order-item';
import { Order } from './../core/entities/order';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/core/entities/cart';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { OrderItemsResponse, OrdersResponse } from './dto/order-response.dto';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { ProductService } from 'src/product/product.service';
import { NOTFOUND } from 'dns';
import { OrderItemDto } from './dto/order-item.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectMapper() private readonly mapper: AutoMapper,
    private readonly _productService: ProductService,
  ) {}
  async createOrder(userId: number): Promise<BaseResponse> {
    const response = new BaseResponse();
    try {
      const cartItems = await this.cartRepository.find({ userId: userId });
      if (cartItems.length == 0) {
        throw new CustomException(BADREQUEST, 'Cart has no item');
      }
      let price = 0.0;
      cartItems.map((item) => {
        price = price + parseFloat((item.price * item.quantity).toFixed(2));
      });

      const order = new Order();
      order.price = price;
      order.userId = userId;
      order.createdAt = new Date();
      this.orderRepository.save(order);

      cartItems.map(async (item) => {
        const orderItem = new OrderItem();
        const product = await this._productService.getProductById(
          item.productId,
        );
        if (product.status && product.data != null) {
          orderItem.contributorId = product.data.userId;
        } else {
          throw new CustomException(NOTFOUND, 'Product not found');
        }
        orderItem.amount = parseFloat((item.price * item.quantity).toFixed(2));
        orderItem.orderId = order.id;
        orderItem.productId = item.productId;
        orderItem.quantity = item.quantity;
        orderItem.createdAt = new Date();
        this.orderItemRepository.save(orderItem);
      });

      await this.cartRepository
        .createQueryBuilder()
        .delete()
        .where({ userId: userId })
        .execute();

      response.message = 'Order created successfully';
      response.status = true;
      return response;
    } catch (error) {}
  }

  async getUserOrders(userId: number): Promise<OrdersResponse> {
    const response = new OrdersResponse();
    const orders = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .where({ userId: userId })
      .getMany();

    const orderDto = this.mapper.mapArray(orders, OrderDto, Order);
    response.status = true;
    response.message = 'Orders fetch successfully';
    response.data = orderDto;
    return response;
  }

  async getOrders(): Promise<OrdersResponse> {
    const response = new OrdersResponse();
    const orders = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .getMany();

    const orderDto = this.mapper.mapArray(orders, OrderDto, Order);
    response.status = true;
    response.message = 'Orders fetch successfully';
    response.data = orderDto;
    return response;
  }

  async getOrderItems(userId: number): Promise<OrderItemsResponse> {
    const response = new OrderItemsResponse();
    try {
      const orders = await this.orderItemRepository.find({ where: { userId } });

      const orderDto = this.mapper.mapArray(orders, OrderItemDto, OrderItem);
      response.status = true;
      response.message = 'Orders fetch successfully';
      response.data = orderDto;
      return response;
    } catch (error) {
      throw new Error('System glitch, contact system administrator');
    }
  }
}
