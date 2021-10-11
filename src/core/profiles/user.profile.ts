import { AutoMapper, ProfileBase } from '@nartc/automapper';
import { Profile } from 'nestjsx-automapper';
import { UserDto } from '../Dtos/userDtos/user-dto';
import { User } from '../entities/users';
import { CreateUserRequest } from '../Dtos/userDtos/create-user-request';

@Profile()
export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(CreateUserRequest, User);
    mapper.createMap(User, UserDto).reverseMap();
  }
}
