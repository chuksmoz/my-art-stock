import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { throwError } from 'src/common/exception/custom-service-exception';
import { BaseResponse } from 'src/core/Dtos/base-response';
import { ProductsResponse } from 'src/core/Dtos/productDto/product-response.dto';
import { OrderItemsResponse } from 'src/order/dto/order-response.dto';
import { CreateSubContributorRequest } from './dtos/create-sub-contributor-request.dto';
import {
  SubContributorResponse,
  SubContributorsResponse,
} from './dtos/sub-contributor-response.dto';
import { UpdateSubContributorRequest } from './dtos/update-contributor-request.dto';
import { SubContributorService } from './sub-contributor.service';

@ApiTags('sub ccontributor')
@Controller('api/v1/subCcontributor')
export class SubContributorController {
  constructor(private readonly subContributorService: SubContributorService) {}

  @ApiOkResponse({ type: ProductsResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get('/getProducts')
  async getAllProduct(@Req() req) {
    try {
      return this.subContributorService.getSubContributorProducts(
        4 /* req.user.id */,
      );
    } catch (error) {
      throwError(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  //@Roles(Role.CUSTOMER, Role.ADMIN)
  @ApiOkResponse({ type: OrderItemsResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get('/getOrders')
  async getAllOrderItem(@Req() req) {
    try {
      return this.subContributorService.getSubContributorOrders(req.user.id);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: SubContributorResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Post('/')
  async createContributor(
    @Body() request: CreateSubContributorRequest,
  ): Promise<SubContributorResponse> {
    try {
      return await this.subContributorService.createSubContributor(1, request);
    } catch (error) {
      throwError(error);
    }
  }

  //@UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SubContributorsResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get('/')
  async getAllSubContributors() {
    try {
      return await this.subContributorService.getSubContributors();
    } catch (error) {
      throwError(error);
    }
  }
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SubContributorResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    try {
      return await this.subContributorService.getSubContributorById(id);
    } catch (error) {
      throwError(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SubContributorResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() payload: UpdateSubContributorRequest,
  ) {
    try {
      return await this.subContributorService.updateSubContributor(id, payload);
    } catch (error) {
      throwError(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: BaseResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    try {
      return await this.subContributorService.deleteSubContributor(id);
    } catch (error) {
      throwError(error);
    }
  }

  /* @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: BaseResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get('/update')
  async test() {
    try {
      return await this.subContributorService.updateSubContributor();
    } catch (error) {
      throwError(error);
    }
  } */

  //@UseGuards(JwtAuthGuard)
  //@Roles(Role.CUSTOMER, Role.ADMIN)

  @Get('/all')
  async getAllOrder(@Req() req) {
    try {
      return this.subContributorService.getSubContributorOrders(req.user.id);
    } catch (error) {
      throwError(error);
    }
  }
}
