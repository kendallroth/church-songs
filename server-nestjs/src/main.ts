import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import chalk from "chalk";
import dayjs from "dayjs";
import dayjsCustomParseFormat from "dayjs/plugin/customParseFormat";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsUtc from "dayjs/plugin/utc";

import { setupSwagger } from "@app/utilities";
import { LoggerService, NestLoggerService } from "@modules/log/services";

// import {AppModule} from "@app/app.module";
// import {setupSwagger} from "@app/utilities";
// import {LoggerService, NestLoggerService} from "@modules/log/services";

import { AppModule } from "./app/app.module";

async function bootstrap() {
  // Extend dayjs parsing (plugins not included by default)
  dayjs.extend(dayjsCustomParseFormat);
  dayjs.extend(dayjsTimezone);
  dayjs.extend(dayjsUtc);

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  // Replace default NestJS 'LoggerService' references with a custom logger in order to override
  //   default logs. However, since the custom service must still match the default signatures of
  //   'ConsoleLogger, a single-use wrapper service was created around the primary custom logger.
  const baseLogger = new LoggerService();
  const nestLogger = new NestLoggerService(baseLogger);
  app.useLogger(nestLogger);

  app.enableCors({
    // Cache preflight response for 1 hour ('Access-Control-Max-Age' header)
    maxAge: 60 * 60,
    origin: configService.get<string[]>("app.corsAllowedOrigins", ["*"]),
  });

  app.useGlobalPipes(
    // Globally transform payload objects to match their TypeScript definition
    // Source: https://docs.nestjs.com/techniques/validation#transform-payload-objects
    new ValidationPipe({
      // Prevent showing default error messages
      // dismissDefaultMessages: true,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const generateSwaggerDocumentation = configService.get<boolean>(
    "app.swaggerDocumentation",
    false,
  );
  if (generateSwaggerDocumentation) {
    setupSwagger(app);
  }

  const port = configService.get<number>("app.port", 3001);

  await app.listen(port);

  nestLogger.log(`${chalk.yellow("⚡")} Listening on port ${port}`, "Bootstrap");
}
bootstrap();
