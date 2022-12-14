import { HttpStatus } from "@nestjs/common";

import { CodedHttpException } from "../http-exceptions/coded.exception";
import { CodedError } from "./coded.error";

/** Internal error to indicate a resource or operation has an invalid state */
export class InvalidStateError extends CodedError {
  /** Convert error to corresponding HTTP exception (for NestJS handling) */
  toHttpException() {
    return new CodedHttpException(this.code, this.message, HttpStatus.CONFLICT);
  }
}
