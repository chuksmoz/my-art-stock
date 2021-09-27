import { ApiProperty } from '@nestjs/swagger';

export class BaseMessageResponse {
  @ApiProperty()
  public status: boolean;
  @ApiProperty()
  public message: string;
}

export class MessageResponse<T> extends BaseMessageResponse {
  @ApiProperty()
  public data: T;
}

export class Response<T> {
  @ApiProperty()
  public data: T;
}

export class customResponse {
  public static getResponse<T>(
    response: boolean,
    message: string,
    data: T,
  ): MessageResponse<T> {
    const messageResponse = new MessageResponse<T>();
    messageResponse.status = response;
    messageResponse.message = message;
    messageResponse.data = data;
    return messageResponse;
  }
  public static getBaseResponse(
    response: boolean,
    message: string,
  ): BaseMessageResponse {
    const messageResponse = new BaseMessageResponse();
    messageResponse.status = response;
    messageResponse.message = message;
    return messageResponse;
  }
}
