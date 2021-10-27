import { throwError } from 'src/common/exception/custom-service-exception';
import { BaseResponse } from './../core/Dtos/base-response';
import { OrderService } from './order.service';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrdersResponse } from './dto/order-response.dto';

@ApiTags('Orders')
@Controller('api/v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @ApiOkResponse({
    description: 'Order list fetched successfully',
    type: OrdersResponse,
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
    type: BaseResponse,
  })
  @ApiBadRequestResponse({
    description: '',
    type: BaseResponse,
  })
  @ApiBearerAuth()
  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  async orderList(@Req() req): Promise<OrdersResponse> {
    try {
      const user = req.user;
      return await this.orderService.getUserOrders(user.id);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({
    description: 'Order created successfully',
    type: BaseResponse,
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
    type: BaseResponse,
  })
  @ApiBadRequestResponse({
    description: '',
    type: BaseResponse,
  })
  @ApiBearerAuth()
  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createOrder(@Req() req): Promise<BaseResponse> {
    try {
      const user = req.user;
      return await this.orderService.createOrder(user.id);
    } catch (error) {
      throwError(error);
    }
  }
}
