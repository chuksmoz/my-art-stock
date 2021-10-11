/* import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { AuthService } from 'src/auth/auth.service';
import { Customer } from 'src/core/entities/customer';
import EncryptionHelperService from 'src/core/utils/EncryptionHelperService';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly _userRepository: Repository<Customer>,
    private encryptor: EncryptionHelperService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @InjectMapper() private readonly mapper: AutoMapper,
  ) {}
}
 */
