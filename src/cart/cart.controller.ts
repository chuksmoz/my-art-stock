import { throwError } from 'src/common/exception/custom-service-exception';
import { CartService } from './cart.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponse } from 'src/core/Dtos/base-response';
import { CartItemsResponse } from './dto/cart-response.dto';
import { CreateCartItemDto } from './dto/cart-request.dto';

@ApiTags('cart')
@Controller('api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CartItemsResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get('')
  public async getCartIems(@Req() req) {
    try {
      const user = req.user;
      return this.cartService.getCartItems(user);
    } catch (error) {
      throwError(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: BaseResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Delete(':id')
  public async delete(@Param('id') id: number, @Req() req) {
    try {
      const user = req.user;
      return this.cartService.removeById(id, user);
    } catch (error) {
      throwError(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: BaseResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Post('add')
  public async addToCart(@Body() payload: CreateCartItemDto, @Req() req) {
    try {
      const user = req.user;
      return this.cartService.addToCart(payload, user);
    } catch (error) {
      throwError(error);
    }
  }
}
