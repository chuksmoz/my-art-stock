import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './../userDtos/user-dto';
export class AuthDto {
  @ApiProperty()
  token: string;
  @ApiProperty()
  expires: number;
  @ApiProperty()
  user: UserDto;
}

export class CreateUserResponse {
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  message: string;
  @ApiProperty()
  data: AuthDto;
}
