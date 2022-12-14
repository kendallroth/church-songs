import { parseBoolSafe, parseIntSafe } from "../parse.util";

describe("Safely parse booleans from strings", () => {
  describe("Parse valid truthy boolean strings", () => {
    const validBoolsTrue = [1, "t", "T", " true ", "True"];

    test.each(validBoolsTrue)("Truthy input - '%s'", (boolString) => {
      const output = parseBoolSafe(boolString, false);

      expect(output).toStrictEqual([true, true]);
    });
  });

  describe("Parse valid falsey boolean strings", () => {
    const validBoolsFalse = [0, "f", "F", " false ", "False"];

    test.each(validBoolsFalse)("Falsey input - '%s'", (boolString) => {
      const output = parseBoolSafe(boolString, true);

      expect(output).toStrictEqual([false, true]);
    });
  });

  describe("Parse invalid boolean strings with defaults", () => {
    const invalidBools: [string, boolean][] = [
      ["temp", false],
      ["fake", true],
      ["", false],
    ];

    test.each(invalidBools)("Invalid input - '%s'", (boolString, defaultValue) => {
      const output = parseBoolSafe(boolString, defaultValue);

      expect(output).toStrictEqual([defaultValue, false]);
    });
  });
});

describe("Safely parse integers from strings", () => {
  describe("Parse valid integer strings", () => {
    const validIntegers = ["0", "-5 ", " 10"];

    test.each(validIntegers)("Valid integer - '%s'", (integerString) => {
      const output = parseIntSafe(integerString, -1);

      expect(output).toStrictEqual([parseInt(integerString, 10), true]);
    });
  });

  describe("Parse invalid integer strings with defaults", () => {
    const invalidIntegers = ["", "-five"];

    test.each(invalidIntegers)("Invalid integer - '%s'", (integerString) => {
      const output = parseIntSafe(integerString, -1);

      expect(output).toStrictEqual([-1, false]);
    });
  });
});
