import { HttpException, HttpStatus } from "@nestjs/common";

/** Internal API exception with code string for app (400) */
export class CodedHttpException extends HttpException {
  /** Error code string (useful with error map in web app) */
  code: string;

  /**
   * Internal exception wrapper (with code for app)
   *
   * Most useful to indicate to the app that a specific error has occurred, allowing the app to
   *   respond accordingly (ie. display errors, etc).
   *
   * @param code    - Exception code string (useful for app error detection)
   * @param message - Exception message
   * @param status  - HTTP status code (default '400')
   */
  constructor(code: string, message?: string, status: number = HttpStatus.BAD_REQUEST) {
    super(
      {
        code,
        message,
        statusCode: status,
      },
      status,
    );

    this.code = code;
  }
}
