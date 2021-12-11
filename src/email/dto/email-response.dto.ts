import { Email } from './../../core/entities/email';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/core/Dtos/base-response';

export class EmailResponseDto extends BaseResponse {
  @ApiProperty({ type: Email })
  data: Email;
}

export class EmailsResponseDto extends BaseResponse {
  @ApiProperty({ type: [Email] })
  data: Email[];
}
