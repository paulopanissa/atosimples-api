import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('AtoSimples')
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(
    configService.get<number>('APP_PORT'),
    configService.get<string>('APP_HOST')
  );

  logger.debug(`Start App "Ato Simples" in ${await app.getUrl()}`)
}
bootstrap();
