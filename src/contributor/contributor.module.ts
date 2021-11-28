import { UsersService } from './../users/users.service';
import { Contributor } from './../core/entities/contributor';
import { Module } from '@nestjs/common';
import { ContributorService } from './contributor.service';
import { ContributorController } from './contributor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/users';
import EncryptionHelperService from 'src/core/utils/EncryptionHelperService';
import { AuthService } from 'src/auth/auth.service';
import '../core/profiles/contributor.profile';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contributor]), UsersService],
  providers: [ContributorService, EncryptionHelperService, AuthService],
  controllers: [ContributorController],
})
export class ContributorModule {}
