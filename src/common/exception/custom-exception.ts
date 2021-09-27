import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter<HttpException> {
  message: string;
  constructor(message = '') {
    this.message = message;
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const msge = statusCode == 404 ? 'Cannot' : 'some';
    console.log(request);

    response.status(statusCode).json({
      status: false,
      message: `${msge} ${request.method} ${request.url}`,
      data: null,
    });
  }
}
