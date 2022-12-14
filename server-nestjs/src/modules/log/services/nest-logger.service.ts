/**
 * NOTE: Because the custom logger is injected into NestJS as an override for default
 *         logger, the "default" function signatures must stay the same!
 *         Changing parameter order will result in Nest invoking this logger incorrectly!
 */

import { Injectable, Scope } from "@nestjs/common";

import { LoggerService } from "./logger.service";

import type { LoggerService as NestLoggerServiceInterface } from "@nestjs/common";

/**
 * Single-use NestJS logger service to replace internal logging service ('LoggerService').
 *
 * NOTE: Only intended to be injected in place of default 'LoggerService,' and necessary because
 *         the default 'ConsoleLogger' (used by Nest) function signatures did not allow adding
 *         'meta' argument in constructor.
 */
@Injectable({ scope: Scope.TRANSIENT })
export class NestLoggerService implements NestLoggerServiceInterface {
  /**
   * Create a new logger context
   *
   * @param context - Logger context (prefixed to all logs to help locate by context)
   */
  constructor(private readonly logger: LoggerService, context?: string) {
    if (context) {
      this.logger.setContext(context);
    }
  }

  /** Debug level log */
  debug(message: string, context?: string) {
    this.logger.debug(message, undefined, context);
  }

  /** Error level log */
  error(message: string, error?: Error | string, context?: string) {
    this.logger.error(message, error, undefined, context);
  }

  /** Info level log */
  log(message: string, context?: string) {
    this.logger.info(message, undefined, context);
  }

  /** Warn level log */
  warn(message: string, context?: string) {
    this.logger.warning(message, undefined, context);
  }
}
