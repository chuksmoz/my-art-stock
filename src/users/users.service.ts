import { BaseResponse } from './../core/Dtos/base-response';
import { NOTFOUND, BADREQUEST } from './../core/utils/constant/exception-types';
import { CustomException } from './../common/exception/custom-service-exception';
import { AutoMapper } from '@nartc/automapper';
import { InjectMapper } from 'nestjsx-automapper';
import { USER_NOT_FOUND } from './../core/utils/constant/user-service.constant';
import { ChangePasswordRequest } from './../core/model/user/change-password-request';
import {
  CreateContributorRequest,
  CreateUserRequest,
} from '../core/Dtos/userDtos/create-user-request';
import {
  GetSingleUserResponse,
  GetUsersResponse,
  UpdateUserRequest,
  UserDto,
} from './../core/Dtos/userDtos/user-dto';
import { AuthService } from './../auth/auth.service';
import { User } from './../core/entities/users';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import EncryptionHelperService from '../core/utils/EncryptionHelperService';
import { AuthDto, CreateUserResponse } from '../core/Dtos/authDtos/auth-dto';
import { Role } from 'src/core/enums/user-role';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private encryptor: EncryptionHelperService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @InjectMapper() private readonly mapper: AutoMapper,
  ) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this._userRepository.findOne({ email: email });
  }
  async getUserById(userId: number): Promise<GetSingleUserResponse> {
    const response = new GetSingleUserResponse();
    const user = await this._userRepository.findOne(userId);
    if (!user) {
      throw new CustomException(USER_NOT_FOUND, NOTFOUND);
    }
    response.message = 'User fetched successfully';
    response.status = true;
    response.data = this.mapper.map(user, UserDto, User);
    return response;
  }

  async getUsers(): Promise<GetUsersResponse> {
    const response = new GetUsersResponse();
    const users = await this._userRepository.find();
    response.status = true;
    response.message = 'UserS fetched successfully';
    response.data = this.mapper.mapArray(users, UserDto, User);
    return response;
  }
  async createUser(payload: CreateUserRequest): Promise<CreateUserResponse> {
    const createUserResponse = new CreateUserResponse();
    const authDto: AuthDto = new AuthDto();
    try {
      if (payload.password !== payload.confirmPassword)
        throw new CustomException('password does not match', NOTFOUND);

      const existingUser = await this.findUserByEmail(payload.email);
      console.log(existingUser);
      if (existingUser)
        throw new CustomException('email already exists', BADREQUEST);
      //const user = this.mapper.map(payload, Users, Createpayload);
      const user: User = new User();
      user.firstName = payload.firstName;
      user.email = payload.email;
      user.password = await this.encryptor.encrypt(payload.password);
      user.modifiedDate = new Date();
      user.isDeleted = false;
      user.isActive = true;
      user.passwordTries = 0;
      const savedUser = await this._userRepository.save(user);
      const res = await this.authService.login(savedUser);
      authDto.token = res.access_token;
      authDto.user = this.mapper.map(savedUser, UserDto, User);
      createUserResponse.message = 'user created successfully';
      createUserResponse.data = authDto;
      createUserResponse.status = true;
      return createUserResponse;
    } catch (error) {
      throw new Error('system glitch, contact system administrator');
    }
  }

  async createContributor(
    payload: CreateContributorRequest,
  ): Promise<CreateUserResponse> {
    const createUserResponse = new CreateUserResponse();
    const authDto: AuthDto = new AuthDto();
    try {
      if (payload.password !== payload.confirmPassword)
        throw new CustomException('password does not match', BADREQUEST);

      const existingUser = await this.findUserByEmail(payload.email);
      console.log(existingUser);
      if (existingUser)
        throw new CustomException('email already exists', BADREQUEST);
      //const user = this.mapper.map(payload, Users, Createpayload);
      const user: User = new User();
      user.firstName = payload.firstName;
      user.lastName = payload.lastName;
      user.email = payload.email;
      user.phoneNumber = payload.phoneNumber;
      user.countryId = payload.countryId;
      user.stateId = payload.stateId;
      user.city = payload.city;
      user.password = await this.encryptor.encrypt(payload.password);
      user.modifiedDate = new Date();
      user.isDeleted = false;
      user.isActive = true;
      user.passwordTries = 0;
      user.role = Role.CONTRIBUTOR;
      const savedUser = await this._userRepository.save(user);
      const res = await this.authService.login(savedUser);
      authDto.token = res.access_token;
      authDto.user = this.mapper.map(savedUser, UserDto, User);
      createUserResponse.message = 'user created successfully';
      createUserResponse.data = authDto;
      createUserResponse.status = true;
      return createUserResponse;
    } catch (error) {
      throw new Error('system glitch, contact system administrator');
    }
  }

  async changePassword(
    userId: number,
    request: ChangePasswordRequest,
  ): Promise<BaseResponse> {
    const response = new BaseResponse();
    try {
      const user = await this._userRepository.findOne(userId);
      console.log(user);
      if (!user) {
        throw new CustomException('User not found', NOTFOUND);
      }
      if (request.newPassword !== request.confirmNewPassword) {
        throw new CustomException('Password do not match', BADREQUEST);
      }
      const isValidPassword = await this.encryptor.validatePassword(
        request.password,
        user.password,
      );
      console.log(isValidPassword);
      if (!isValidPassword) {
        throw new CustomException('Invalid Password', BADREQUEST);
      }
      user.password = await this.encryptor.encrypt(request.newPassword);
      user.modifiedDate = new Date();
      const res = await this._userRepository
        .createQueryBuilder()
        .update()
        .set(user)
        .where('id = :id', { id: user.id })
        .execute();
      console.log(res);
      //await this._userRepository.update(userId, user);
      response.status = true;
      response.message = 'success';
      return response;
    } catch (error) {
      console.log(error);
      throw new Error('system glitch, contact system administrator');
    }
  }

  async updateUser(
    id: number,
    payload: UpdateUserRequest,
  ): Promise<GetSingleUserResponse> {
    const response = new GetSingleUserResponse();
    const existingUser = await this._userRepository.findOne(id);
    if (!existingUser) {
      throw new CustomException(USER_NOT_FOUND, NOTFOUND);
    }
    existingUser.firstName = payload.firstName;
    existingUser.lastName = payload.lastName;
    await this._userRepository
      .createQueryBuilder()
      .update()
      .set(existingUser)
      .where('id= :id', { id: id })
      .execute();

    response.message = 'User updated successfully';
    response.status = true;
    response.data = this.mapper.map(existingUser, UserDto, User);
    return response;
  }

  async deleteUser(id: number): Promise<BaseResponse> {
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

    response.message = 'User deleted successfully';
    response.status = true;
    return response;
  }
}
