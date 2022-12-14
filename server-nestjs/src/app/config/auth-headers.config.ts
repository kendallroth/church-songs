import { registerAs } from "@nestjs/config";

import { ConfigError } from "@common/errors";

export interface AuthHeadersConfig {
  /** Auth header required to perform certain DevOps operations */
  authHeaderDevOps: string;
}

export default registerAs("authHeaders", (): AuthHeadersConfig => {
  const authHeaderDevOps = process.env.AUTH_HEADER_DEV_OPS;
  if (!authHeaderDevOps) {
    throw new ConfigError("AUTH_HEADER_DEV_OPS", "Auth dev-ops header secret missing");
  }

  return {
    authHeaderDevOps,
  };
});
