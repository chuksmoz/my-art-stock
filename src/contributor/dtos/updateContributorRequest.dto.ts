import { AutoMap } from '@nartc/automapper';

export class UpdateContributorRequest {
  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

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
}
