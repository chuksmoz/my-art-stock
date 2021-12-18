import { SubContributor } from './../core/entities/sub-contributor';
import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../core/entities/users';
import EncryptionHelperService from '../core/utils/EncryptionHelperService';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import '../core/profiles/user.profile';
import { Contributor } from 'src/core/entities/contributor';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Contributor, SubContributor]),
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UsersService, EncryptionHelperService, AuthService],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
})
export class UsersModule {}
