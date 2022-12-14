/**
 * NOTE: Cannot be injected as the internal NestJS logger because the log function signature
 *         has been shifted to accomodate an additional 'meta' argument (before 'context')!
 */

import { Injectable, Optional, Scope } from "@nestjs/common";
import dayjs from "dayjs";
import winston from "winston";

import { winstonConsoleFormatter } from "../utilities/winston-console-formatter.util";

import type { Json } from "@common/types/json.types";
import type { LoggerOptions, Logger as LoggerType } from "winston";

/** Winston log service severity level configuration */
const winstonLoggerLevels = {
  critical: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

/** Winston log service severity levels */
export type WinstonLogLevel = keyof typeof winstonLoggerLevels;

interface BaseLogData {
  context?: string;
  error?: Error | string;
  meta?: Json;
}

/**
 * Custom NestJS logger service abstraction
 *
 * Logger should be injected per context (service, controller). Customizing the context
 *   is optional but provides valuable context (indicates origin).
 *
 * @example
 *   class SampleService {
 *     constructor(private logger: LoggerService) {
 *        this.logger.setContext(SampleService.name);
 *     }
 *   }
 *
 * @source https://docs.nestjs.com/techniques/logger#injecting-a-custom-logger
 * @source https://github.com/nestjs/nest/issues/507#issuecomment-374221089
 */
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private logger: LoggerType;

  /**
   * Create a new logger context
   *
   * @param context - Logger context (prefixed to all logs to help locate by context)
   */
  constructor(@Optional() protected context?: string) {
    // NOTE: Logger transports should be created in the constructor vs instance-level static fields,
    //         to prevent memory warnings for attatching too many transport listeners (due to HMR reloads).
    const loggerOptions: LoggerOptions = {
      levels: winstonLoggerLevels,
      transports: [
        new winston.transports.Console({
          format: winstonConsoleFormatter,
          level: "debug",
        }),
      ],
    };

    this.logger = winston.createLogger(loggerOptions);
  }

  /**
   * Abstraction/wrapper over underlying logger instance
   *
   * NOTE: Enables changing out the underlying logger instance more easily via loose coupling.
   *
   * @param level   - Log level
   * @param message - Log message
   * @param data    - Additional log data (error, meta object, etc)
   */
  private createLog(level: string, message: string, data: BaseLogData) {
    // NOTE: Apparently some utility methods are not actually supported by Winston (although typed),
    //         and using the underlying 'log' is easiest for reducing code.
    this.logger.log(level, message, {
      ...data,
      // NOTE: Some data should always override provided data!
      context: data.context ?? this.context,
      timestamp: dayjs().toISOString(),
    });
  }

  /**
   * Critical level log
   *
   * @param message - Log message
   * @param meta    - Additional meta information
   * @param context - Log context override (recommend to avoid)
   */
  critical(message: string, error?: Error | string, meta?: Json, context?: string) {
    this.createLog("critical", message, {
      context,
      error,
      meta,
    });
  }

  /**
   * Debug level log
   *
   * @param message - Log message
   * @param meta    - Additional meta information
   * @param context - Log context override (recommend to avoid)
   */
  debug(message: string, meta?: Json, context?: string) {
    this.createLog("debug", message, {
      context,
      meta,
    });
  }

  /**
   * Error level log
   *
   * @param message - Log message
   * @param error   - Error object/shape
   * @param meta    - Additional meta information
   * @param context - Log context override (recommend to avoid)
   */
  error(message: string, error?: Error | string, meta?: Json, context?: string) {
    this.createLog("error", message, {
      context,
      error,
      meta,
    });
  }

  /**
   * Info level log
   *
   * @param message - Log message
   * @param meta    - Additional meta information
   * @param context - Log context override (recommend to avoid)
   */
  info(message: string, meta?: Json, context?: string) {
    this.createLog("info", message, {
      context,
      meta,
    });
  }

  /**
   * Warn level log
   *
   * @param message - Log message
   * @param meta    - Additional meta information
   * @param context - Log context override (recommend to avoid)
   */
  warning(message: string, meta?: Json, context?: string) {
    this.createLog("warn", message, {
      context,
      meta,
    });
  }

  /** Set logger context (prefixed to logs for grouping by context) */
  setContext(context: string) {
    this.context = context;
  }
}
