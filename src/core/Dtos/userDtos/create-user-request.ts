import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { AutoMap } from 'nestjsx-automapper';

export class CreateUserRequest {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @AutoMap()
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  profileImageUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  confirmPassword: string;
}
