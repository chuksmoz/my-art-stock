import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';


const fs = require("fs");

let key = fs.readFileSync("/etc/letsencrypt/live/draiba.com/privkey.pem");
let cert = fs.readFileSync("/etc/letsencrypt/live/draiba.com/fullchain.pem");

let httpsOptions = {key: key, cert: cert}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions, cors: true });
  const config = new DocumentBuilder()
    .setTitle('The My Art Stock')
    .setDescription('The My Art Stock API description')
    .setVersion('1.0')
    .addTag('My Art Stock')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const port = process.env.PORT || 3000;
  await app.listen(port, ()=>{console.log(`Running on port ${port}`)});
}
bootstrap();

