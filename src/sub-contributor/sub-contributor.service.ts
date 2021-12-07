import { SubContributor } from './../core/entities/sub-contributor';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NOTFOUND } from 'dns';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { CustomException } from 'src/common/exception/custom-service-exception';
import { BaseResponse } from 'src/core/Dtos/base-response';
import { Contributor } from 'src/core/entities/contributor';
import { User } from 'src/core/entities/users';
import { Role } from 'src/core/enums/user-role';
import { BADREQUEST } from 'src/core/utils/constant/exception-types';
import { USER_NOT_FOUND } from 'src/core/utils/constant/user-service.constant';
import EncryptionHelperService from 'src/core/utils/EncryptionHelperService';
import { Repository } from 'typeorm';
import { CreateSubContributorRequest } from './dtos/create-sub-contributor-request.dto';
import {
  SubContributorResponse,
  SubContributorsResponse,
} from './dtos/sub-contributor-response.dto';
import { SubContributorDto } from './dtos/sub-contributor.dto';
import { UpdateSubContributorRequest } from './dtos/update-contributor-request.dto';
import { Product } from 'src/core/entities/product';

@Injectable()
export class SubContributorService {
  constructor(
    private encryptor: EncryptionHelperService,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    @InjectRepository(Contributor)
    private readonly _contributorRepository: Repository<Contributor>,
    @InjectRepository(SubContributor)
    private readonly _subContributorRepository: Repository<SubContributor>,
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
    @InjectMapper() private readonly mapper: AutoMapper,
  ) {}

  async createSubContributor(
    contributorId: number,
    payload: CreateSubContributorRequest,
  ): Promise<SubContributorResponse> {
    const response = new SubContributorResponse();
    try {
      const existingUser = await this._userRepository.findOne({
        email: payload.email,
      });
      if (existingUser)
        throw new CustomException('email already exists', BADREQUEST);

      const contributor = await this._contributorRepository.findOne(
        contributorId,
      );
      if (!contributor)
        throw new CustomException('contributor does not exists', BADREQUEST);

      const user: User = new User();
      user.email = payload.email;
      user.password = await this.encryptor.encrypt('Welcome@123');
      user.modifiedDate = new Date();
      user.isDeleted = false;
      user.isActive = true;
      user.passwordTries = 0;
      user.role = Role.SUB_CONTRIBUTOR;
      const savedUser = await this._userRepository.save(user);

      const subContributor = new SubContributor();
      subContributor.firstName = payload.firstName;
      subContributor.lastName = payload.lastName;
      subContributor.email = payload.email;
      subContributor.phoneNumber = payload.phoneNumber;
      subContributor.countryId = payload.countryId;
      subContributor.stateId = payload.stateId;
      subContributor.city = payload.city;
      subContributor.modifiedDate = new Date();
      subContributor.isDeleted = false;
      subContributor.isActive = true;
      subContributor.contributor = contributor;
      subContributor.user = savedUser;

      const savedSubContributor = await this._subContributorRepository.save(
        subContributor,
      );

      response.data = this.mapper.map(
        savedSubContributor,
        SubContributorDto,
        SubContributor,
      );
      response.message = 'user created successfully';
      response.status = true;
      return response;
    } catch (error) {
      console.log(error);
      throw new Error('system glitch, contact system administrator');
    }
  }

  async getSubContributorById(id: number): Promise<SubContributorResponse> {
    const response = new SubContributorResponse();
    const subContributor = await this._subContributorRepository.findOne(id);
    if (!subContributor) {
      throw new CustomException(USER_NOT_FOUND, NOTFOUND);
    }
    response.message = 'User fetched successfully';
    response.status = true;
    response.data = this.mapper.map(
      subContributor,
      SubContributorDto,
      SubContributor,
    );
    return response;
  }

  async getSubContributors(): Promise<SubContributorsResponse> {
    const response = new SubContributorsResponse();
    const subContributors = await this._subContributorRepository.find();
    response.status = true;
    response.message = 'UserS fetched successfully';
    response.data = this.mapper.mapArray(
      subContributors,
      SubContributorDto,
      SubContributor,
    );
    return response;
  }

  async updateSubContributor(
    id: number,
    payload: UpdateSubContributorRequest,
  ): Promise<SubContributorResponse> {
    const response = new SubContributorResponse();
    const existingSubContributor = await this._subContributorRepository.findOne(
      id,
    );
    if (!existingSubContributor) {
      throw new CustomException(USER_NOT_FOUND, NOTFOUND);
    }
    existingSubContributor.firstName = payload.firstName;
    existingSubContributor.lastName = payload.lastName;
    await this._subContributorRepository
      .createQueryBuilder()
      .update()
      .set(existingSubContributor)
      .where('id= :id', { id: id })
      .execute();

    response.message = 'User updated successfully';
    response.status = true;
    response.data = this.mapper.map(
      existingSubContributor,
      SubContributorDto,
      SubContributor,
    );
    return response;
  }

  async deleteSubContributor(id: number): Promise<BaseResponse> {
    const response = new BaseResponse();
    const existingSubContributor = await this._subContributorRepository.findOne(
      id,
    );
    if (!existingSubContributor) {
      throw new CustomException(USER_NOT_FOUND, NOTFOUND);
    }
    existingSubContributor.isDeleted = true;
    await this._userRepository
      .createQueryBuilder()
      .update()
      .set(existingSubContributor)
      .where('id= :id', { id: id })
      .execute();

    response.message = 'User deleted successfully';
    response.status = true;
    return response;
  }

  async getProduct(id: number) {
    await this._productRepository.find({ where: { id } });
  }
}
