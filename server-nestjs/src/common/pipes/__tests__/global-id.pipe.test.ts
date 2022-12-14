import { BadRequestException } from "@nestjs/common";
import { v4 as uuid } from "uuid";

import { ParamUUIDPipe } from "../global-id.pipe";

describe("ParamUUIDPipe", () => {
  let target: ParamUUIDPipe;

  beforeEach(() => {
    target = new ParamUUIDPipe();
  });

  describe("valid transformation", () => {
    test("normal result", () => {
      const input = uuid();

      const output = target.transform(input);

      expect(output).toBe(output);
    });
  });

  describe("invalid transformation", () => {
    test("handles invalid UUID", () => {
      const output = () => target.transform("fake");

      expect(output).toThrowError(BadRequestException);
    });
  });
});
