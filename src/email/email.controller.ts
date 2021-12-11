import { EmailService } from './email.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { throwError } from 'src/common/exception/custom-service-exception';
import { BaseResponse } from 'src/core/Dtos/base-response';
import { CreateEmailRequestDto } from './dto/create-email-request-dto';
import { EmailResponseDto, EmailsResponseDto } from './dto/email-response.dto';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @ApiOkResponse({ type: EmailResponseDto })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Post('')
  async createContributor(
    @Body() request: CreateEmailRequestDto,
  ): Promise<EmailResponseDto> {
    try {
      return await this.emailService.addEmail(request);
    } catch (error) {
      throwError(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: EmailsResponseDto })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get('')
  async getAllSubContributors() {
    try {
      return await this.emailService.getAllEmail();
    } catch (error) {
      throwError(error);
    }
  }
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: EmailResponseDto })
  @ApiBadRequestResponse({ type: BaseResponse })
  @ApiNotFoundResponse({ type: BaseResponse })
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    try {
      return await this.emailService.getEmailById(id);
    } catch (error) {
      throwError(error);
    }
  }
}
