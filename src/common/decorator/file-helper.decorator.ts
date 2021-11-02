import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@Injectable()
export class FilesToBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    //console.log(req.files);
    /* if (req.files) {
      console.log(' for me  kkd');
      req.files.map((file) => {
        const { fieldname } = file;
        console.log(fieldname);
      });
      for (const key in req.files) {
        console.log(req.files[key]);
        //const { fieldname } = req.files[key];
        console.log(key);
        //console.log(`${key}: ${req.files[key]}`);
      }
    } */
    if (req.body && req.files) {
      for (const key in req.files) {
        if (!req.body[key]) {
          req.body[key] = req.files[key];
        } else {
          req.body[key].push(req.files[key]);
        }
      }
      //console.log(req.body);
      /* req.files.forEach((file: Express.Multer.File) => {
        const { fieldname } = file;
        if (!req.body[fieldname]) {
          req.body[fieldname] = [file];
        } else {
          req.body[fieldname].push(file);
        }
        
      }); */
    }

    return next.handle();
  }
}

export const ApiFile =
  (options?: ApiPropertyOptions): PropertyDecorator =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (target: Object, propertyKey: string | symbol) => {
    if (options?.isArray) {
      ApiProperty({
        type: 'array',
        items: {
          type: 'file',
          properties: {
            [propertyKey]: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })(target, propertyKey);
    } else {
      ApiProperty({
        type: 'file',
        properties: {
          [propertyKey]: {
            type: 'string',
            format: 'binary',
          },
        },
      })(target, propertyKey);
    }
  };
