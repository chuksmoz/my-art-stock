import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from 'src/core/entities/refresh-token';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly _refreshTokenRepository: Repository<RefreshToken>,
  ) {}
  async createRefreshToken(token: string, expirationDate: Date): Promise<void> {
    const resfreshToken = new RefreshToken();
    resfreshToken.token = token;
    resfreshToken.expiration = expirationDate;
    await this._refreshTokenRepository.save(resfreshToken);
  }

  async getRefreshToken(token: string, expirationDate: Date): Promise<void> {
    const resfreshToken = new RefreshToken();
    resfreshToken.token = token;
    resfreshToken.expiration = expirationDate;
    await this._refreshTokenRepository.save(resfreshToken);
  }
}
