import { SubContributorDto } from './../../sub-contributor/dtos/sub-contributor.dto';
import { AutoMapper, ProfileBase } from '@nartc/automapper';
import { Profile } from 'nestjsx-automapper';
import { UserDto } from '../Dtos/userDtos/user-dto';
import { User } from '../entities/users';
import { CreateUserRequest } from '../Dtos/userDtos/create-user-request';
import { ContributorDto } from 'src/contributor/dtos/contributor.dto';

@Profile()
export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(CreateUserRequest, User);
    mapper.createMap(User, UserDto).reverseMap();
    mapper.createMap(User, SubContributorDto).reverseMap();
    mapper.createMap(User, ContributorDto).reverseMap();
  }
}
