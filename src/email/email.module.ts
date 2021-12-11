import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from 'src/core/entities/email';

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService, TypeOrmModule],
})
export class EmailModule {}
