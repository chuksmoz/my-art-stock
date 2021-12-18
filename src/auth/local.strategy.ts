import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    //console.log('local strategy');
    //console.log(email);
    try {
      const user = await this.authService.validateUser(email, password);
      console.log(user);
      if (!user) {
        throw new HttpException(
          {
            status: false,
            message: 'Unauthorized',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: error.message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
