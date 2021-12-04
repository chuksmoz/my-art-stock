import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';
import { SubContributor } from '../entities/sub-contributor';
import { SubContributorDto } from 'src/sub-contributor/dtos/sub-contributor.dto';

@Profile()
export class SubContributorProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(SubContributor, SubContributorDto).reverseMap();
  }
}
