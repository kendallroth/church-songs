import { CodedHttpException } from "../http-exceptions/coded.exception";
import { BaseError } from "./base.error";

/** Internal error with code string for app */
export class CodedError extends BaseError {
  /** Error code string (useful with error map in web app) */
  code: string;

  /**
   * Internal error wrapper (with code for app)
   *
   * Most useful to indicate to the app that a specific error has occurred, allowing the app to
   *   respond accordingly (ie. display errors, etc).
   *
   * @param code    - Error code string (useful for app error detection)
   * @param message - Error message
   */
  constructor(code: string, message: string) {
    super(message);

    this.code = code;
  }

  /** Convert error to corresponding HTTP exception (for NestJS handling) */
  toHttpException() {
    return new CodedHttpException(this.code, this.message);
  }
}
