import { LoggerService } from "@modules/log/services";

import { parseBoolSafe, parseIntSafe } from "./parse.util";

const envLogger = new LoggerService("EnvParse");

/**
 * Parse a boolean from an environment variable
 *
 * @param env             - Environment variable values
 * @param key             - Environment variable name/key
 * @param defaultValue    - Default value if missing/invalid
 * @param invalidWarning  - Whether to log a warning for missing/invalid keys
 */
export const parseEnvBool = (
  env: NodeJS.ProcessEnv,
  key: string,
  defaultValue: boolean,
  invalidWarning = true,
): boolean => {
  const rawValue = env[key];
  const [parsedValue, valid] = parseBoolSafe(rawValue, defaultValue);

  if (!valid && invalidWarning) {
    envLogger.warning(
      `Invalid env value for '${key}' (input: '${rawValue}' - using: '${parsedValue}')`,
    );
  }

  return parsedValue;
};

/**
 * Parse an integer from an environment variable
 *
 * @param env             - Environment variable values
 * @param key             - Environment variable name/key
 * @param defaultValue    - Default value if missing/invalid
 * @param invalidWarning  - Whether to log a warning for missing/invalid keys
 */
export const parseEnvInt = (
  env: NodeJS.ProcessEnv,
  key: string,
  defaultValue: number,
  invalidWarning = true,
): number => {
  const rawValue = env[key];
  const [parsedValue, valid] = parseIntSafe(rawValue, defaultValue);

  if (!valid && invalidWarning) {
    envLogger.warning(
      `Invalid env value for '${key}' (input: '${rawValue}' - using: '${parsedValue}')`,
    );
  }

  return parsedValue;
};

/**
 * Parse a string from an environment variable
 *
 * @param env             - Environment variable values
 * @param key             - Environment variable name/key
 * @param defaultValue    - Default value if missing/invalid
 * @param invalidWarning  - Whether to log a warning for missing/invalid keys
 */
export const parseEnvString = (
  env: NodeJS.ProcessEnv,
  key: string,
  defaultValue: string,
  invalidWarning = true,
): string => {
  const rawValue = env[key];
  // NOTE: Must use falsey check to ensure empty strings are counted as invalid!
  const parsedValue = rawValue?.trim() || defaultValue;
  const valid = parsedValue === rawValue;

  if (!valid && invalidWarning) {
    envLogger.warning(
      `Invalid env value for '${key}' (input: '${rawValue}' - using: '${parsedValue}')`,
    );
  }

  return parsedValue;
};
