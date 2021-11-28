import { AutoMap } from '@nartc/automapper';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubContributorRequest {
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

  @AutoMap()
  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  countryId: number;

  @ApiProperty()
  @IsNotEmpty()
  stateId: number;

  @ApiProperty()
  @IsNotEmpty()
  city: string;
}
