import { ContributorDto } from './../../contributor/dtos/contributor.dto';
import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';
import { Contributor } from '../entities/contributor';

@Profile()
export class ContributorProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Contributor, ContributorDto).reverseMap();
  }
}
