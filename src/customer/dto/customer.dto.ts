import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AutoMap } from 'nestjsx-automapper';
import { BaseResponse } from 'src/core/Dtos/base-response';

export class CustomerDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  firstName: string;

  @ApiProperty()
  @AutoMap()
  lastName: string;

  @ApiProperty()
  @AutoMap()
  email: string;

  @ApiProperty()
  @AutoMap()
  profileImageUrl: string;

  @ApiProperty()
  @AutoMap()
  createdDate: Date;

  @ApiProperty()
  @AutoMap()
  modifiedDate: Date;

  @ApiProperty()
  @AutoMap()
  isDeleted: boolean;
  @ApiProperty()
  @AutoMap()
  lastLoginDate: Date;
}

export class GetCustomersResponse extends BaseResponse {
  @ApiProperty({ type: [CustomerDto] })
  data: CustomerDto[];
}

export class GetSingleCustomerResponse extends BaseResponse {
  @ApiProperty({ type: CustomerDto })
  data: CustomerDto;
}

export class UpdateCustomerRequest {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;
}
