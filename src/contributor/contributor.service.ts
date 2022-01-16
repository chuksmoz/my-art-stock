import { ProductsResponse } from './../core/Dtos/productDto/product-response.dto';
import { ContributorDto } from './dtos/contributor.dto';
import { Contributor } from './../core/entities/contributor';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CustomException } from 'src/common/exception/custom-service-exception';
import { AuthDto, CreateUserResponse } from 'src/core/Dtos/authDtos/auth-dto';
import { User } from 'src/core/entities/users';
import { BADREQUEST, NOTFOUND } from 'src/core/utils/constant/exception-types';
import EncryptionHelperService from 'src/core/utils/EncryptionHelperService';
import { Repository } from 'typeorm';
import {
  ContributorResponse,
  ContributorsResponse,
} from './dtos/contributorResponse.dto';
import { Role } from 'src/core/enums/user-role';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from 'src/core/Dtos/userDtos/user-dto';
import { BaseResponse } from 'src/core/Dtos/base-response';
import { USER_NOT_FOUND } from 'src/core/utils/constant/user-service.constant';
import { UpdateContributorRequest } from './dtos/updateContributorRequest.dto';
import { CreateContributorRequest } from './dtos/createContributorRequest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';
import { OrderItemsResponse } from 'src/order/dto/order-response.dto';
import { SubContributorsResponse } from 'src/sub-contributor/dtos/sub-contributor-response.dto';
//import { SubContributorsResponse } from 'src/sub-contributor/dtos/sub-contributor-response.dto';

@Injectable()
export class ContributorService {
  constructor(
    private encryptor: EncryptionHelperService,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    @InjectRepository(Contributor)
    private readonly _contributorRepository: Repository<Contributor>,
    //private readonly _subContributorRepository: Repository<SubContributor>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @InjectMapper()
    private readonly mapper: AutoMapper,
    private readonly _productService: ProductService /*private readonly _orderService: OrderService, */,
  ) {}

  async createContributor(
    payload: CreateContributorRequest,
  ): Promise<CreateUserResponse> {
    const createUserResponse = new CreateUserResponse();
    const authDto: AuthDto = new AuthDto();
    if (payload.password !== payload.confirmPassword)
      throw new CustomException('password does not match', BADREQUEST);

    const existingUser = await this._userRepository.findOne({
      email: payload.email,
    });
    console.log(existingUser);
    if (existingUser)
      throw new CustomException('email already exists', BADREQUEST);
    //const user = this.mapper.map(payload, Users, Createpayload);
    const user: User = new User();
    user.email = payload.email;
    user.password = await this.encryptor.encrypt(payload.password);
    user.modifiedDate = new Date();
    user.isDeleted = false;
    user.isActive = true;
    user.passwordTries = 0;
    user.role = Role.CONTRIBUTOR;
    const savedUser = await this._userRepository.save(user);

    const contributor = new Contributor();
    contributor.firstName = payload.firstName;
    contributor.lastName = payload.lastName;
    contributor.email = payload.email;
    contributor.phoneNumber = payload.phoneNumber;
    contributor.countryId = payload.countryId;
    contributor.stateId = payload.stateId;
    contributor.city = payload.city;
    contributor.modifiedDate = new Date();
    contributor.isDeleted = false;
    contributor.isActive = true;

    const savedContributor = await this._contributorRepository.save(
      contributor,
    );

    const res = await this.authService.login(savedUser);
    authDto.token = res.token;
    authDto.user = this.mapper.map(savedContributor, UserDto, Contributor);
    createUserResponse.message = 'Contributor created successfully';
    createUserResponse.data = authDto;
    createUserResponse.status = true;
    return createUserResponse;
  }

  async getContributorById(id: number): Promise<ContributorResponse> {
    const response = new ContributorResponse();
    const contributor = await this._contributorRepository.findOne(id);
    if (!contributor) {
      throw new CustomException(USER_NOT_FOUND, NOTFOUND);
    }
    response.message = 'Contributor fetched successfully';
    response.status = true;
    response.data = this.mapper.map(contributor, ContributorDto, Contributor);
    return response;
  }

  async getContributorByUserId(userId: number): Promise<Contributor> {
    //const response = new ContributorResponse();
    return await this._contributorRepository.findOne({
      where: { userId },
    });
  }

  async getContributors(): Promise<ContributorsResponse> {
    const response = new ContributorsResponse();
    const contributors = await this._contributorRepository.find();
    response.status = true;
    response.message = 'Contributors fetched successfully';
    response.data = this.mapper.mapArray(
      contributors,
      ContributorDto,
      Contributor,
    );
    return response;
  }

  async updateContributor(
    id: number,
    payload: UpdateContributorRequest,
  ): Promise<ContributorResponse> {
    const response = new ContributorResponse();
    const existingContributors = await this._contributorRepository.findOne(id);
    if (!existingContributors) {
      throw new CustomException(USER_NOT_FOUND, NOTFOUND);
    }
    existingContributors.firstName = payload.firstName;
    existingContributors.lastName = payload.lastName;
    await this._contributorRepository
      .createQueryBuilder()
      .update()
      .set(existingContributors)
      .where('id= :id', { id: id })
      .execute();

    response.message = 'Contributor updated successfully';
    response.status = true;
    response.data = this.mapper.map(
      existingContributors,
      ContributorDto,
      Contributor,
    );
    return response;
  }

  async deleteContributor(id: number): Promise<BaseResponse> {
    const response = new BaseResponse();
    const existingUser = await this._userRepository.findOne(id);
    if (!existingUser) {
      throw new CustomException(USER_NOT_FOUND, NOTFOUND);
    }
    existingUser.isDeleted = true;
    await this._userRepository
      .createQueryBuilder()
      .update()
      .set(existingUser)
      .where('id= :id', { id: id })
      .execute();

    response.message = 'Contributor deleted successfully';
    response.status = true;
    return response;
  }

  async getContributorProducts(id: number): Promise<ProductsResponse> {
    try {
      const existingUser = await this._userRepository.findOne(id);
      /* const existingUser = await this._userRepository
        .createQueryBuilder()
        .leftJoinAndSelect('user.contributor', 'contributor')
        .leftJoinAndSelect('contributor.products', 'product')
        .where('id= :id', { id })
        .getOne(); */
      if (!existingUser) {
        throw new CustomException(USER_NOT_FOUND, NOTFOUND);
      }
      console.log(existingUser);
      return await this._productService.getProductsByUserId(id);
    } catch (error) {
      throw new Error('system glitch, contact system administrator');
    }
  }

  /*
  async getContributorOrders(id: number): Promise<OrderItemsResponse> {
    try {
      const contributor = await this._contributorRepository.findOne(id);
      if (!contributor) {
        throw new CustomException(USER_NOT_FOUND, NOTFOUND);
      }

      return await this._orderService.getOrderItems(id);
    } catch (error) {
      throw new Error('system glitch, contact system administrator');
    }
  } */

  async getSubContributor(id: number): Promise<SubContributorsResponse> {
    console.log(`LETS US CHECK ${id}`);
    const response = new SubContributorsResponse();
    try {
      const contributor = await this._contributorRepository
        .createQueryBuilder()
        .leftJoinAndSelect('contributor.subContributors', 'subContributors')
        .where('id= :id')
        .getOne();

      /* findOne({
        where: { id },
        relations: ['subContributors'],
      }); */
      if (!contributor) {
        throw new CustomException(USER_NOT_FOUND, NOTFOUND);
      }

      response.data = contributor.subContributors;
      response.status = true;
      response.message = 'Sub contributor fetched successfully';

      return response;
    } catch (error) {
      throw new Error('system glitch, contact system administrator');
    }
  }
}
