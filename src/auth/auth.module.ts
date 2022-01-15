import { SubContributor } from 'src/core/entities/sub-contributor';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import EncryptionHelperService from '../core/utils/EncryptionHelperService';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contributor } from 'src/core/entities/contributor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contributor, SubContributor]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    EncryptionHelperService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService, EncryptionHelperService, TypeOrmModule],
  controllers: [AuthController],
})
export class AuthModule {}
