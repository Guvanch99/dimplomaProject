import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5010;

  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription('Documentation rest api')
    .setVersion('1.0.0')
    .addTag('Guvanch')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
