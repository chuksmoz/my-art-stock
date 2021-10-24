import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { CustomException } from 'src/common/exception/custom-service-exception';
import { BADREQUEST } from 'src/core/utils/constant/exception-types';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  /* async uploadImage2(file: Express.Multer.File): Promise<UploadApiResponse> {
    const upload = await v2.uploader.upload_stream((err, res)=>{
      if (err) {
        throw new CustomException(err.message, BADREQUEST);
      }
    })
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  } */
}
