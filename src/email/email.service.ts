import { Email } from './../core/entities/email';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { Repository } from 'typeorm';
import { CreateEmailRequestDto } from './dto/create-email-request-dto';
import { EmailResponseDto, EmailsResponseDto } from './dto/email-response.dto';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
    @InjectMapper() private readonly mapper: AutoMapper,
  ) {}

  async addEmail(payload: CreateEmailRequestDto): Promise<EmailResponseDto> {
    const response = new EmailResponseDto();

    const email = new Email();
    email.to = payload.to;
    email.from = payload.from;
    email.body = payload.body;
    email.subject = payload.subject;
    const newEmail = await this.emailRepository.save(email);

    response.status = true;
    response.message = 'Email added successfully';
    response.data = newEmail;
    return response;
  }

  async getAllEmail(): Promise<EmailsResponseDto> {
    const response = new EmailsResponseDto();
    try {
      const emails = await this.emailRepository.find();

      response.message = 'Emails fetched successfully';
      response.status = true;
      response.data = emails;
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmailById(id: number): Promise<EmailResponseDto> {
    const response = new EmailResponseDto();
    const email = await this.emailRepository.findOne(id);

    response.status = true;
    response.message = 'Email fetch successfully';
    response.data = email;
    return response;
  }
}
