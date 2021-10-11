import { Controller, Get, HttpException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('')
  getHello() {
    return this.appService.getHello();
  }
  /* @Get('/test')
  test() {
    try {
      return this.appService.test();
    } catch (error) {
      console.log(error.message);
      if (error instanceof CustomServiceException) {
        throw new HttpException(error.message, error.Code);
      } else {
      }
    }
  } */
}
