import { Injectable } from '@nestjs/common';
import { CustomServiceException } from './common/exception/custom-service-exception';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  test() {
    throw new CustomServiceException('test', 100);
  }
}
