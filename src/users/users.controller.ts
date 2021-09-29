import { CreateUserResponse } from './../core/Dtos/authDtos/auth-dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Role } from './../core/enums/user-role';
import { RolesGuard } from './../auth/roles-auth.guard';
import { Roles } from './../core/utils/decorator/role-decorator';
import { UserDto, GetUserResponse } from './../core/Dtos/userDtos/user-dto';
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
  HttpException,
} from '@nestjs/common';
import { CreateUserRequest } from '../core/Dtos/userDtos/create-user-request';
import { Response } from 'express';
import { ChangePasswordRequest } from '../core/model/user/change-password-request';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { MessageResponse } from '../core/Dtos/message-response';

@ApiTags('user')
@Controller('api/v1/user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOkResponse({
    type: CreateUserResponse,
  })
  @Post('')
  async createUser(
    @Body() request: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    try {
      return await this.userService.createUser(request);
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOkResponse({
    type: GetUserResponse,
  })
  @Get('')
  async getAllUsers() {
    try {
      return await this.userService.getUsers();
    } catch (error) {
      throw new HttpException(
        { status: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }

    /* return 
    if (response && response.status) {
      return res.status(HttpStatus.OK).send(response);
    }
    return res.status(HttpStatus.BAD_REQUEST).send(response); */
  }

  @Get(':id')
  async getUserById(@Param('id') id: number, @Res() res: Response) {
    const response = await this.userService.getUserById(id);
    if (response && response.status) {
      return res.status(HttpStatus.OK).send(response);
    }
    return res.status(HttpStatus.BAD_REQUEST).send(response);
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
