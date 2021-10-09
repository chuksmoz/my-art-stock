import { AutoMap } from '@nartc/automapper';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseResponse } from '../base-response';

export class UserDto {
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
  createdDate: Date;

  @ApiProperty()
  @AutoMap()
  modifiedDate: Date;

  @ApiProperty()
  @AutoMap()
  isDeleted: boolean;
}

export class GetUsersResponse extends BaseResponse {
  @ApiProperty({ type: [UserDto] })
  data: UserDto[];
}

export class GetSingleUserResponse extends BaseResponse {
  @ApiProperty({ type: UserDto })
  data: UserDto;
}

export class UpdateUserRequest {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;
}
