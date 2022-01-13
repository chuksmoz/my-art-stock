import { User } from './../core/entities/users';
import { UserDto } from 'src/core/Dtos/userDtos/user-dto';
import { BADREQUEST } from './../core/utils/constant/exception-types';
import { CustomException } from './../common/exception/custom-service-exception';
import {
  INVALID_CREDENTIAL,
  USER_LOCK,
} from './../core/utils/constant/auth-service.constant';
import { UsersService } from './../users/users.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import EncryptionHelperService from '../core/utils/EncryptionHelperService';
import { JwtService } from '@nestjs/jwt';
import { Contributor } from 'src/core/entities/contributor';
import { Role } from 'src/core/enums/user-role';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubContributor } from 'src/core/entities/sub-contributor';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly encryptor: EncryptionHelperService,
    private jwtService: JwtService,
    @InjectMapper() private readonly mapper: AutoMapper,
    @InjectRepository(Contributor)
    private readonly contributorRepository: Repository<Contributor>,
    @InjectRepository(SubContributor)
    private readonly subContributorRepository: Repository<SubContributor>,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    console.log(user);
    if (!user) {
      throw new CustomException(INVALID_CREDENTIAL, BADREQUEST);
    }
    const isValidPassword = await this.encryptor.validatePassword(
      password,
      user.password,
    );
    if (!isValidPassword) {
      const failedAttempts = user.passwordTries + 1;
      user.passwordTries = failedAttempts;
      user.isActive = failedAttempts < 6;
      await this.usersService.updateUser(user.id, user);
      if (user.passwordTries >= 6) throw new Error(USER_LOCK);
      throw new Error(
        INVALID_CREDENTIAL +
          ` you have ${6 - failedAttempts} more ${
            6 - failedAttempts === 1 ? 'try' : 'tries'
          }`,
      );
    }
    user.passwordTries = 0;
    user.lastLoginDate = new Date();
    await this.usersService.updateUser(user.id, user);
    return user;
  }

  async login(user: User) {
    console.log(`check me out ${user.role}`);
    let userDto = new UserDto();
    const payload = { username: user.email, sub: user.id };

    if (user.role == Role.CONTRIBUTOR) {
      const contributor = await this.contributorRepository.findOne({
        where: { userId: user.id },
      });
      if (contributor) {
        userDto = this.mapper.map(contributor, UserDto, Contributor);
      }
    } else if (user.role == Role.SUB_CONTRIBUTOR) {
      const subContributor = await this.subContributorRepository.findOne({
        where: { userId: user.id },
      });
      if (subContributor) {
        userDto = this.mapper.map(subContributor, UserDto, SubContributor);
      }
    } else {
      userDto = this.mapper.map(user, UserDto, User);
    }
    //authDto.token = this.jwtService.sign(payload),
    //authDto.
    return {
      token: this.jwtService.sign(payload),
      user: userDto,
      expires: 60000,
    };
  }
}
