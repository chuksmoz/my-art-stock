import { HttpException, HttpStatus } from '@nestjs/common';
import {
  BADREQUEST,
  NOTFOUND,
  UNAUTHORIZED,
} from 'src/core/utils/constant/exception-types';

export class CustomException extends Error {
  constructor(message, name) {
    super(message);
    this.name = name;
  }
}

export function throwError(error: any) {
  if (error instanceof CustomException) {
    if (error.name == NOTFOUND)
      throw new HttpException(
        { status: false, message: error.message },
        HttpStatus.NOT_FOUND,
      );
    else if (error.name == BADREQUEST)
      throw new HttpException(
        { status: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    else if (error.name == UNAUTHORIZED)
      throw new HttpException(
        { status: false, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    else
      throw new HttpException(
        { status: false, message: error.message },
        HttpStatus.NOT_FOUND,
      );
  } else {
    throw new HttpException(
      { status: false, message: error.message },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
