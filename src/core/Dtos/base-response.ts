import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  message: string;
}
