import { User } from 'src/core/entities/users';
import { SubContributor } from './../core/entities/sub-contributor';
import { Module } from '@nestjs/common';
import { SubContributorService } from './sub-contributor.service';
import { SubContributorController } from './sub-contributor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contributor } from 'src/core/entities/contributor';
import EncryptionHelperService from 'src/core/utils/EncryptionHelperService';
import '../core/profiles/sub-contributor.profile';
import { Product } from 'src/core/entities/product';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubContributor, Contributor, User, Product]),
  ],
  providers: [SubContributorService, EncryptionHelperService],
  controllers: [SubContributorController],
})
export class SubContributorModule {}
