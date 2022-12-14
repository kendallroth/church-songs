import { NotFoundException } from "@nestjs/common";

import { BaseError } from "./base.error";

/** Internal error to indicate a resource does not exist */
export class NotFoundError extends BaseError {
  /** Convert error to corresponding HTTP exception (for NestJS handling) */
  toHttpException() {
    return new NotFoundException(this.message);
  }
}
