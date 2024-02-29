import { Global, Module, ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// // import { RedisService } from './redis.service';
// // import { createClient } from 'redis';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
// import { AllExceptionFilter } from '@/common/filters/all-exception.filter';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { SharedService } from './shared.service';

@Global()
@Module({
  // imports: [
  //   TypeOrmModule.forRootAsync({
  //     inject: [ConfigService],
  //     useFactory: (configService: ConfigService) => {
  //       return {
  //         type: 'postgres',
  //         autoLoadEntities: true,
  //         host: process.env.DB_HOST || configService.get('DB_HOST'),
  //         port: +process.env.DB_PORT || configService.get('DB_PORT'),
  //         username: process.env.DB_USERNAME || configService.get('DB_USERNAME'),
  //         password: process.env.DB_PASSWORD || configService.get('DB_PASSWORD'),
  //         database: process.env.DB_DATABASE || configService.get('DB_DATABASE'),
  //         syncronize: configService.get('DB_SYNC'),
  //         logging: process.env.NODE_ENV === 'development',
  //       };
  //     },
  //   }),
  // ],
  providers: [
    SharedService,
    // {
    //   inject: [ConfigService],
    //   provide: 'REDIS_CLIENT',
    //   async useFactory(configService: ConfigService) {
    //     const client = createClient({
    //       url: configService.get('REDIS_URL'),
    //     });
    //     await client.connect();
    //     return client;
    //   },
    // },
    // {
    //   // 全局错误过滤器
    //   provide: APP_FILTER,
    //   useClass: AllExceptionFilter,
    // },
    // {
    //   // 全局拦截器
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor,
    // },
  ],
  exports: [SharedService],
})
export class SharedModule {}
