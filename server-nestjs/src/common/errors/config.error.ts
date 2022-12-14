import { HttpStatus } from "@nestjs/common";

import { CodedHttpException } from "../http-exceptions/coded.exception";
import { BaseError } from "./base.error";

/** Internal API configuration variable error */
export class ConfigError extends BaseError {
  /** Invalid configuration variable */
  variable: string;

  /** Internal configuration variable error */
  constructor(variable: string, message: string) {
    super(message);

    this.variable = variable;
  }

  /** Convert error to corresponding HTTP exception (for NestJS handling) */
  toHttpException() {
    return new CodedHttpException(this.variable, this.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
