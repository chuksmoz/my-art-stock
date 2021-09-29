import { USER_NOT_FOUND } from './../core/utils/constant/user-service.constant';
import { ChangePasswordRequest } from './../core/model/user/change-password-request';
import { CreateUserRequest } from '../core/Dtos/userDtos/create-user-request';
import { UserDto } from './../core/Dtos/userDtos/user-dto';
import { AuthService } from './../auth/auth.service';
import {
  BaseMessageResponse,
  customResponse,
} from './../core/Dtos/message-response';
import { User } from './../core/entities/users';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import EncryptionHelperService from '../core/utils/EncryptionHelperService';
import { MessageResponse } from '../core/Dtos/message-response';
import { AuthDto, CreateUserResponse } from '../core/Dtos/authDtos/auth-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private encryptor: EncryptionHelperService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this._userRepository.findOne({ email: email });
  }
  async getUserById(userId: number): Promise<MessageResponse<UserDto>> {
    const user = await this._userRepository.findOne(userId);
    if (user) {
      //const userVm = this.mapper.map(user, UserDto, User);
      return customResponse.getResponse<UserDto>(true, 'success', user);
    }
    return customResponse.getResponse<UserDto>(false, 'User not found', null);
  }

  async getUsers(): Promise<MessageResponse<UserDto[]>> {
    const users = await this._userRepository.find();
    //const userVm = this.mapper.mapArray(users, UserDto, User);
    return customResponse.getResponse<UserDto[]>(true, 'success', users);
  }
  async createUser(
    userRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const createUserResponse = new CreateUserResponse();
    const authDto: AuthDto = new AuthDto();
    try {
      if (userRequest.password !== userRequest.confirmPassword)
        throw new BadRequestException('password does not match');

      const existingUser = await this.findUserByEmail(userRequest.email);
      console.log(existingUser);
      if (existingUser) throw new Error('email already exists');
      //const user = this.mapper.map(userRequest, Users, CreateUserRequest);
      const user: User = new User();
      user.firstName = userRequest.firstName;
      user.lastName = userRequest.lastName;
      user.email = userRequest.email;
      user.password = await this.encryptor.encrypt(userRequest.password);
      user.modifiedDate = new Date();
      user.isDeleted = false;
      user.isActive = true;
      user.passwordTries = 0;
      const savedUser = await this._userRepository.save(user);
      const res = await this.authService.login(savedUser);
      authDto.token = res.access_token;
      authDto.user = savedUser; //this.mapper.map(savedUser, UserDto, User);
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
  ): Promise<BaseMessageResponse> {
    try {
      const user = await this._userRepository.findOne(userId);
      console.log(user);
      if (!user) {
        return customResponse.getBaseResponse(false, 'User not found');
      }
      if (request.newPassword !== request.confirmNewPassword) {
        return customResponse.getBaseResponse(false, 'Password do not match');
      }
      const isValidPassword = await this.encryptor.validatePassword(
        request.password,
        user.password,
      );
      console.log(isValidPassword);
      if (!isValidPassword) {
        return customResponse.getBaseResponse(false, 'Invalid Password');
      }
      user.password = await this.encryptor.encrypt(request.newPassword);
      user.modifiedDate = new Date();
      user.firstName = 'chuks';
      const res = await this._userRepository
        .createQueryBuilder()
        .update()
        .set(user)
        .where('id = :id', { id: user.id })
        .execute();
      console.log(res);
      //await this._userRepository.update(userId, user);
      return customResponse.getBaseResponse(true, 'success');
    } catch (error) {
      console.log(error);
      return customResponse.getBaseResponse(false, 'System glitch');
    }
  }

  async updateUser(id: number, user: User): Promise<void> {
    const existingUser = await this._userRepository.findOne(id);
    if (!existingUser) {
      throw new Error(USER_NOT_FOUND);
    }
    await this._userRepository
      .createQueryBuilder()
      .update()
      .set(user)
      .where('id= :id', { id: id })
      .execute();
  }
}
