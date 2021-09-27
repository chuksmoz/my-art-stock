import * as bcrypt from 'bcrypt';

export default class EncryptionHelperService {
  async encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async validatePassword(
    password: string,
    encrptedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, encrptedPassword);
  }
}
