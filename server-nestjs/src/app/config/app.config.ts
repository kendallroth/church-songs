import { registerAs } from "@nestjs/config";
import dayjs from "dayjs";

import { parseEnvBool, parseEnvInt, parseEnvString } from "@common/utilities/env.util";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require("../../../../package.json");

/** Root level API config */
export interface ApiConfig {
  /** Allowed origins for CORS */
  corsAllowedOrigins: string[];
  /** API port */
  port: number;
  /** Whether API is in a production environment */
  production: boolean;
  /** Whether Swagger documentation should be generated */
  swaggerDocumentation: boolean;
  /** API version/release information */
  version: {
    /** Release date */
    releaseDate?: string;
    /** Git commit hash */
    releaseHash?: string;
    /** API project semantic version number */
    version: string;
  };
}

export default registerAs("app", (): ApiConfig => {
  const nodeEnv = parseEnvString(process.env, "NODE_ENV", "development");

  // TODO: Eventually update to use web app URL and port variables
  const rawCorsOrigins = parseEnvString(
    process.env,
    "ALLOWED_ORIGINS",
    "http://localhost:3000",
    false,
  );
  const corsAllowedOrigins = rawCorsOrigins.split(",").filter((o) => o);

  const releaseDateEnv = process.env.RELEASE_DATE;
  const releaseDate = releaseDateEnv
    ? dayjs(releaseDateEnv).format("YYYY-MMM-DD HH:mm")
    : undefined;

  return {
    corsAllowedOrigins,
    port: parseEnvInt(process.env, "API_PORT", 3001),
    production: nodeEnv === "production",
    swaggerDocumentation: parseEnvBool(process.env, "SWAGGER_DOCUMENTATION", false),
    version: {
      releaseDate,
      releaseHash: process.env.IMAGE_TAG,
      version,
    },
  };
});
