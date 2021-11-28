import { AutoMap } from '@nartc/automapper';

export class SubContributorDto {
  @AutoMap()
  id: number;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  email: string;

  @AutoMap()
  phoneNumber: string;

  @AutoMap()
  profileImageUrl: string;

  @AutoMap()
  countryId: number;

  @AutoMap()
  stateId: number;

  @AutoMap()
  city: string;

  @AutoMap()
  createdDate: Date;

  @AutoMap()
  modifiedDate: Date;

  @AutoMap()
  isDeleted: boolean;

  @AutoMap()
  isActive: boolean;
}
