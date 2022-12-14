/**
 * Parse a string as a boolean
 *
 * NOTE: Unexpected/unsupported input will be ignored in favour of the default value.
 *
 * Primarily intended for use with parsing environment variables.
 */
export const parseBoolSafe = (
  value: string | number | undefined,
  defaultValue: boolean,
): [value: boolean, valid: boolean] => {
  // Normalize values to simplify checks against boolean strings (numbers, etc)
  const trimmedValue = value?.toString().trim()?.toLowerCase();

  if (!trimmedValue) {
    return [defaultValue, false];
  }

  const truthyStrings = ["1", "t", "true"];
  const falseyStrings = ["0", "f", "false"];

  if (truthyStrings.includes(trimmedValue)) {
    return [true, true];
  } else if (falseyStrings.includes(trimmedValue)) {
    return [false, true];
  } else {
    return [defaultValue, false];
  }
};

/**
 * Parse a string as an integer
 *
 * NOTE: Unexpected/unsupported input will be ignored in favour of the default value.
 *
 * Primarily intended for use with parsing environment variables.
 */
export const parseIntSafe = (
  value: string | undefined,
  defaultValue: number,
): [value: number, valid: boolean] => {
  const parsedValue = Number.parseInt(value as string, 10);

  return isNaN(parsedValue) ? [defaultValue, false] : [parsedValue, true];
};
