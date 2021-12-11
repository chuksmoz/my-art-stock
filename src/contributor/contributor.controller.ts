import { UpdateContributorRequest } from './dtos/updateContributorRequest.dto';
import {
  ContributorResponse,
  ContributorsResponse,
} from './dtos/contributorResponse.dto';
import { ContributorService } from './contributor.service';
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
import { CreateUserResponse } from 'src/core/Dtos/authDtos/auth-dto';
import { BaseResponse } from 'src/core/Dtos/base-response';
import { CreateContributorRequest } from './dtos/createContributorRequest.dto';
import { throwError } from 'src/common/exception/custom-service-exception';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductsResponse } from 'src/core/Dtos/productDto/product-response.dto';

@ApiTags('contributor')
@Controller('api/v1/contributor')
export class ContributorController {
  constructor(private readonly contributorService: ContributorService) {}

  @ApiOkResponse({ type: CreateUserResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Post('')
  async createContributor(
    @Body() request: CreateContributorRequest,
  ): Promise<CreateUserResponse> {
    try {
      return await this.contributorService.createContributor(request);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: ContributorsResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get('')
  async getAllUsers() {
    try {
      return await this.contributorService.getContributors();
    } catch (error) {
      throwError(error);
    }
  }
  @ApiOkResponse({ type: ContributorResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    try {
      return await this.contributorService.getContributorById(id);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: ContributorResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() payload: UpdateContributorRequest,
  ) {
    try {
      return await this.contributorService.updateContributor(id, payload);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: BaseResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    try {
      return await this.contributorService.deleteContributor(id);
    } catch (error) {
      throwError(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  //@Roles(Role.CUSTOMER, Role.ADMIN)
  @ApiOkResponse({ type: ProductsResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get('getProducts')
  async getAllProduct(@Req() req) {
    try {
      return this.contributorService.getContributorProducts(req.user.id);
    } catch (error) {
      throwError(error);
    }
  }
}
