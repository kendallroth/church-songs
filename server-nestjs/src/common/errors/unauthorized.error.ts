import { UnauthorizedException } from "@nestjs/common";

import { BaseError } from "./base.error";

/** Internal error to indicate authentication issue */
export class UnauthorizedError extends BaseError {
  /** Convert error to corresponding HTTP exception (for NestJS handling) */
  toHttpException() {
    return new UnauthorizedException(this.message);
  }
}
