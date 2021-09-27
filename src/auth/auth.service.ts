import {
  INVALID_CREDENTIAL,
  USER_LOCK,
} from './../core/utils/constant/auth-service.constant';
import { User } from '../core/entities/users';
import { UsersService } from './../users/users.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import EncryptionHelperService from '../core/utils/EncryptionHelperService';
import { JwtService } from '@nestjs/jwt';
//import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly encryptor: EncryptionHelperService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    console.log(email);
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new Error(INVALID_CREDENTIAL);
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
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async test() {
    throw new Error(USER_LOCK);
  }
}
