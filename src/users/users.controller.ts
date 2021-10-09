import { BaseResponse } from './../core/Dtos/base-response';
import { CreateUserResponse } from './../core/Dtos/authDtos/auth-dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  GetSingleUserResponse,
  GetUsersResponse,
  UpdateUserRequest,
} from './../core/Dtos/userDtos/user-dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Param,
  Req,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserRequest } from '../core/Dtos/userDtos/create-user-request';
import { ChangePasswordRequest } from '../core/model/user/change-password-request';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { throwError } from './../common/exception/custom-service-exception';

@ApiTags('user')
@Controller('api/v1/user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOkResponse({ type: CreateUserResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Post('')
  async createUser(
    @Body() request: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    try {
      return await this.userService.createUser(request);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: CreateUserResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Post('/createContributor')
  async createContributor(
    @Body() request: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    try {
      return await this.userService.createContributor(request);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: GetUsersResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get('')
  async getAllUsers() {
    try {
      return await this.userService.getUsers();
    } catch (error) {
      throwError(error);
    }
  }
  @ApiOkResponse({ type: GetSingleUserResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: GetSingleUserResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() payload: UpdateUserRequest,
  ) {
    try {
      return await this.userService.updateUser(id, payload);
    } catch (error) {
      throwError(error);
    }
  }

  @ApiOkResponse({ type: GetSingleUserResponse })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throwError(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('changePassword')
  async changePassword(
    @Body() model: ChangePasswordRequest,
    @Res() res,
    @Req() req,
  ) {
    const user = req.user;
    const response = await this.userService.changePassword(user.id, model);
    if (response && response.status) {
      return res.status(HttpStatus.OK).send(response);
    }
    return res.status(HttpStatus.BAD_REQUEST).send(response);
  }
}
