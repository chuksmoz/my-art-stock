import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/core/Dtos/base-response';
import { ContributorDto } from './contributor.dto';

export class ContributorsResponse extends BaseResponse {
  @ApiProperty({ type: [ContributorDto] })
  data: ContributorDto[];
}

export class ContributorResponse extends BaseResponse {
  @ApiProperty({ type: ContributorDto })
  data: ContributorDto;
}
