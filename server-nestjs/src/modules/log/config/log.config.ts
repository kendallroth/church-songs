import { registerAs } from "@nestjs/config";

import { parseEnvBool } from "@common/utilities/env.util";

/** Logger config */
export interface LogConfig {
  /** Whether HTTP requests should be logged (intended for development) */
  logHttpRequests: boolean;
}

export default registerAs(
  "log",
  (): LogConfig => ({
    logHttpRequests: parseEnvBool(process.env, "LOG_HTTP_REQUESTS", false),
  }),
);
