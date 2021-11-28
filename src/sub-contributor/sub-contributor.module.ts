import { User } from 'src/core/entities/users';
import { SubContributor } from './../core/entities/sub-contributor';
import { Module } from '@nestjs/common';
import { SubContributorService } from './sub-contributor.service';
import { SubContributorController } from './sub-contributor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contributor } from 'src/core/entities/contributor';

@Module({
  imports: [TypeOrmModule.forFeature([SubContributor, Contributor, User])],
  providers: [SubContributorService],
  controllers: [SubContributorController],
})
export class SubContributorModule {}
