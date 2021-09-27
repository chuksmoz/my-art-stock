import { UserDto } from './../userDtos/user-dto';
export class AuthDto {
  token: string;
  expires: number;
  user: UserDto;
}
