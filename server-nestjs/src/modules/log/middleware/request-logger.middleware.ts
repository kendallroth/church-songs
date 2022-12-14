import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { v4 as uuidv4 } from "uuid";

import { logConfig as _logConfig } from "../config";
import { LoggerService } from "../services";

import type { LoggedRequest } from "@common/types/request.types";
import type { NestMiddleware } from "@nestjs/common";
import type { NextFunction, Response } from "express";

/**
 * Log incoming HTTP requests
 */
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(_logConfig.KEY)
    private readonly logConfig: ConfigType<typeof _logConfig>,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext("RequestLogger");
  }

  use(req: LoggedRequest, res: Response, next: NextFunction) {
    // Request ID can be used to group related logs together (to a request)
    // TODO: Not yet actually utilized while logging, can be implemented later as/if needed!
    const requestId = uuidv4();
    req.requestId = requestId;

    // HTTP requests should typically only be logged in development (can inflate logs in production)
    if (!this.logConfig.logHttpRequests) {
      return next();
    }

    const startTime = new Date().getTime();

    // NOTE: Response status code is not actually set until the response has been completed!
    res.on("finish", () => {
      const requestTime = new Date().getTime() - startTime;
      const method = req.method.padStart(5, " ");
      const routeMessage = `${method} ${res.statusCode} ${req.path} (${requestTime}ms)`;
      this.logger.debug(routeMessage);
    });

    next();
  }
}
