import { OrderService } from 'src/order/order.service';
import { OrderModule } from './../order/order.module';
import { EmailModule } from './../email/email.module';
import { ProductModule } from './../product/product.module';
import { User } from 'src/core/entities/users';
import { SubContributor } from './../core/entities/sub-contributor';
import { Module } from '@nestjs/common';
import { SubContributorService } from './sub-contributor.service';
import { SubContributorController } from './sub-contributor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contributor } from 'src/core/entities/contributor';
import EncryptionHelperService from 'src/core/utils/EncryptionHelperService';
import '../core/profiles/sub-contributor.profile';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    EmailModule,
    ProductModule,
    OrderModule,
    TypeOrmModule.forFeature([SubContributor, Contributor, User]),
  ],
  providers: [
    SubContributorService,
    EncryptionHelperService,
    EmailService,
    OrderService,
  ],
  controllers: [SubContributorController],
  exports: [SubContributorService],
})
export class SubContributorModule {}
