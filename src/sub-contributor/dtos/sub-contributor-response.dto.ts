import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/core/Dtos/base-response';
import { SubContributorDto } from './sub-contributor.dto';

export class SubContributorsResponse extends BaseResponse {
  @ApiProperty({ type: [SubContributorDto] })
  data: SubContributorDto[];
}

export class SubContributorResponse extends BaseResponse {
  @ApiProperty({ type: SubContributorDto })
  data: SubContributorDto;
}
