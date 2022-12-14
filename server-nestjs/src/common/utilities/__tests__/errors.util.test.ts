import { HttpException, HttpStatus } from "@nestjs/common";

import { assertError } from "../errors.util";

describe("assertError", () => {
  const validErrors = [
    { label: "Error", error: new Error("test") },
    { label: "HttpException", error: new HttpException("test", HttpStatus.BAD_REQUEST) },
  ];

  test.each(validErrors)("does not throw with valid $label", (errorConfig) => {
    try {
      throw errorConfig.error;
    } catch (e: unknown) {
      expect(() => assertError(e)).not.toThrowError();
    }
  });

  test("throws original error for invalid errors", () => {
    const invalidError = "Sample error";

    try {
      throw invalidError;
    } catch (e: unknown) {
      expect(() => assertError(e)).toThrow(invalidError);
    }
  });
});
