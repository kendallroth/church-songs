import chalk from "chalk";
import dayjs from "dayjs";
import { format } from "winston";

import type { WinstonLogLevel } from "../services";

const { printf } = format;

/** Match a log level to a terminal color */
const getColorFromLogLevel = (logLevel: WinstonLogLevel): chalk.ChalkFunction => {
  switch (logLevel) {
    case "debug":
      return chalk.reset;
    case "critical":
    case "error":
      return chalk.red;
    case "info":
      return chalk.green;
    case "warn":
      return chalk.yellow;
    default:
      return chalk.reset;
  }
};

/**
 * Custom formatter for Winston console transport
 *
 * Source: https://github.com/winstonjs/logform#printf
 */
const winstonConsoleFormatter = printf(({ context, error, level, message, meta, timestamp }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isObject = (obj: any) =>
    typeof obj !== "undefined" && obj !== null && typeof obj === "object";
  const color = getColorFromLogLevel(level as WinstonLogLevel);

  // TODO: Determine if this is the best approach to displaying object data
  const outputMessage = isObject(message)
    ? `${color("Object:")}\n${JSON.stringify(message, null, 2)}`
    : color(message as string);
  // Meta object can contain anything (including massive objects) and therefore should not be formatted (saves space)
  const metaMessage = isObject(meta) ? `\n${color("meta")}: ${JSON.stringify(meta)}` : meta ?? "";

  const prefix = color("[Nest]");
  const contextMessage = context ? chalk.yellow(`[${context}] `) : "";
  const timeMessage = dayjs(timestamp).format("YYYY/MM/DD HH:mm:ss");
  const logLevelMessage = color(level.toUpperCase().padStart(8, " "));
  const errorMessage = error ? `\n${error.stack ?? error}` : "";
  return `${prefix} ${timeMessage} ${logLevelMessage} ${contextMessage}${outputMessage}${metaMessage}${errorMessage}`;
});

export { winstonConsoleFormatter };
