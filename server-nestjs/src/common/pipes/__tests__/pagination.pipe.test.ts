import { BadRequestException } from "@nestjs/common";

import {
  PAGINATION_PAGE_SIZE_DEFAULT,
  PAGINATION_PAGE_SIZE_MAX,
} from "@common/utilities/pagination.util";

import { PaginationPagePipe, PaginationSizePipe } from "../pagination.pipe";

describe("PaginationPagePipe", () => {
  let target: PaginationPagePipe;

  beforeEach(() => {
    target = new PaginationPagePipe();
  });

  describe("valid transformation", () => {
    test("normal result", () => {
      const output = target.transform("3");

      expect(output).toBe(3);
    });

    describe("transforms within boundaries", () => {
      const invalidInput = ["-1", "", "0"];

      test.each(invalidInput)("test page boundary - '%s'", (input) => {
        const output = target.transform(input);

        expect(output).toBe(1);
      });
    });
  });

  describe("invalid transformation", () => {
    test("handles invalid numbers", () => {
      const output = () => target.transform("fake");

      expect(output).toThrowError(BadRequestException);
    });
  });
});

describe("PaginationSizePipe", () => {
  let target: PaginationSizePipe;

  beforeEach(() => {
    target = new PaginationSizePipe();
  });

  describe("valid transformation", () => {
    test("normal result", () => {
      const output = target.transform("2");

      expect(output).toBe(2);
    });

    describe("transforms within boundaries", () => {
      const invalidInput = [
        { input: "-1", output: PAGINATION_PAGE_SIZE_DEFAULT },
        { input: "", output: PAGINATION_PAGE_SIZE_DEFAULT },
        { input: "0", output: PAGINATION_PAGE_SIZE_DEFAULT },
        { input: "1000", output: PAGINATION_PAGE_SIZE_MAX },
      ];

      test.each(invalidInput)("test page boundary - '%s'", (config) => {
        const output = target.transform(config.input);

        expect(output).toBe(config.output);
      });
    });
  });

  describe("invalid transformation", () => {
    test("handles invalid numbers", () => {
      const output = () => target.transform("fake");

      expect(output).toThrowError(BadRequestException);
    });
  });
});
