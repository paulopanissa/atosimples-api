import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import validationSchema from '@/config/env'
import { BullModule } from '@nestjs/bull';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from '@/ormconfig'

console.log(connectionOptions)

export function DatabaseOrmModule(): DynamicModule {
  return TypeOrmModule.forRoot(connectionOptions)
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema
    }),
    DatabaseOrmModule(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        }
      })
    }),
    CoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
