import { Catch, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

import { BaseError } from "@common/errors";
import { LoggerService } from "@modules/log/services";

import type { ArgumentsHost } from "@nestjs/common";

/**
 * Exception filter to log uncaught/unexpected exceptions
 *
 * NOTE: Assumes all uncaught exceptions are caused by an HTTP workflow, which may be incorrect
 *         if/when additional workflows are supported (CLI, etc)?
 *
 * Source: https://docs.nestjs.com/exception-filters#inheritance
 */
@Catch()
export class UncaughtExceptionFilter extends BaseExceptionFilter {
  constructor(private readonly logger: LoggerService) {
    super();
    this.logger.setContext(UncaughtExceptionFilter.name);
  }

  catch(exception: Error, host: ArgumentsHost) {
    // Some intentially thrown errors can be automatically converted to their corresponding
    //   HTTP exception and handled appropriately by NestJS (in 'super' call). This enables
    //   only using HTTP exceptions in controllers (HTTP context) and using non-HTTP exceptions
    //   in locations without the HTTP context (services, etc).
    if (exception instanceof BaseError) {
      exception = exception.toHttpException();
    }

    // Uncaught non-HTTP exceptions should have a bit of extra logging, as it most likely
    //   indicates an unexpected/unhandled issue. Errors inheriting from 'HttpException' are
    //   assumed to have been already handled and thrown intentionally!
    const isHttpException = exception instanceof HttpException;
    if (!isHttpException) {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest<Request | null>();

      // NOTE: Must use loose falsey check to handle empty strings
      const message = exception.message || "Uncaught error thrown";

      // Attach a bit of additional meta information to uncaught errors to help with debugging
      this.logger.error(message, exception, {
        method: request?.method,
        url: request?.url,
      });
    }

    // NOTE: 'BaseExceptionHandler' has been patched to allow skipping the default logging (already handled above)
    super.catch(exception, host, true);
  }
}
