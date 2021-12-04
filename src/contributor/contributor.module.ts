import { UsersModule } from './../users/users.module';
import { Contributor } from './../core/entities/contributor';
import { Module } from '@nestjs/common';
import { ContributorService } from './contributor.service';
import { ContributorController } from './contributor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/users';
import EncryptionHelperService from 'src/core/utils/EncryptionHelperService';
import { AuthService } from 'src/auth/auth.service';
import '../core/profiles/contributor.profile';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Contributor]),
    UsersModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [ContributorService, EncryptionHelperService, AuthService],
  controllers: [ContributorController],
})
export class ContributorModule {}
