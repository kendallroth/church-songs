import { BadRequestException } from "@nestjs/common";

import { BaseError } from "./base.error";

/** Internal error to indicate an invalid request */
export class BadRequestError extends BaseError {
  /** Convert error to corresponding HTTP exception (for NestJS handling) */
  toHttpException() {
    return new BadRequestException(this.message);
  }
}
