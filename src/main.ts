import { CustomExceptionFilter } from './common/exception/custom-exception';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('The My Art Stock')
    .setDescription('The My Art Stock API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  //const { httpAdapter } = app.get(HttpAdapterHost);
  //app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3000);
}
bootstrap();
