import { InternalServerErrorException } from "@nestjs/common";

import type { HttpException } from "@nestjs/common";

/**
 * Base error class for internal exceptions
 *
 * HTTP exceptions should be reserved for HTTP contexts only (ie. controllers). However, having
 *   similar errors for internal usage (ie. services) enables easily mapping to HTTP errors.
 *
 * NOTE: Contains a helper to convert the error to a matching NestJS 'HttpException`, enabling
 *         NestJS to automatically convert to a response in uncaught exception filter.
 */
export abstract class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }

  /**
   * Convert error to corresponding HTTP exception (for NestJS handling)
   *
   * NOTE: Defaults to an internal server error to indicate it potentially has not been handled,
   *         but can (and should) be overridden as necessary.
   */
  toHttpException(): HttpException {
    return new InternalServerErrorException(this.message);
  }
}
