import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { logConfig } from "./config";
import { LogController } from "./controllers";
import { RequestLoggerMiddleware } from "./middleware";
import { LoggerService } from "./services";

import type { MiddlewareConsumer } from "@nestjs/common";

@Global()
@Module({
  controllers: [LogController],
  exports: [LoggerService],
  imports: [ConfigModule.forFeature(logConfig)],
  providers: [LoggerService],
})
export class LogModule {
  configure(consumer: MiddlewareConsumer) {
    // Request logging and correlation IDs should be applied to all routes
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
