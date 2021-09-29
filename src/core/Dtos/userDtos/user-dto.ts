import { AutoMap } from '@nartc/automapper';
import { ApiProperty } from '@nestjs/swagger';

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

export class GetUserResponse {
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  message: string;
  @ApiProperty({ type: [UserDto] })
  data: UserDto[];
}
