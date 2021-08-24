import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import fs from 'fs';

async function bootstrap() {
  const app_http = await NestFactory.create(AppModule);
  // const app_https = await NestFactory.create(AppModule, {
  //   key: fs.readFileSync('./secrets/private-key.pem'),
  //   cert: fs.readFileSync('./secrets/public-certificate.pem'),
  // });
  app_http.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('Nest猫Api文档')
  .setDescription('测试猫API文档')
  .setVersion('1.0')
  .addTag('app')
  .build();

  const document = SwaggerModule.createDocument(app_http, config);
  SwaggerModule.setup('api', app_http, document);

  app_http.listen(3000);
  // app_https.listen(443);
}
bootstrap();
