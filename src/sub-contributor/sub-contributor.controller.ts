import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { throwError } from 'src/common/exception/custom-service-exception';
import { BaseResponse } from 'src/core/Dtos/base-response';
import { CreateSubContributorRequest } from './dtos/create-sub-contributor-request.dto';
import {
  SubContributorResponse,
  SubContributorsResponse,
} from './dtos/sub-contributor-response.dto';
import { UpdateSubContributorRequest } from './dtos/update-contributor-request.dto';
import { SubContributorService } from './sub-contributor.service';

@Controller('subCcontributor')
export class SubContributorController {
  constructor(private readonly subContributorService: SubContributorService) {}

  @ApiOkResponse({ type: SubContributorResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Post('')
  async createContributor(
    @Body() request: CreateSubContributorRequest,
  ): Promise<SubContributorResponse> {
    try {
      return await this.subContributorService.createSubContributor(1, request);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: SubContributorsResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get('')
  async getAllUsers() {
    try {
      return await this.subContributorService.getSubContributors();
    } catch (error) {
      throwError(error);
    }
  }
  @ApiOkResponse({ type: SubContributorResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    try {
      return await this.subContributorService.getSubContributorById(id);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: SubContributorResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Put(':id')
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

  @ApiOkResponse({ type: BaseResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    try {
      return await this.subContributorService.deleteSubContributor(id);
    } catch (error) {
      throwError(error);
    }
  }
}
