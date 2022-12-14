import { testProcessEnv } from "@common/test";

import logConfig from "../log.config";

describe("LogConfig", () => {
  const testEnv = testProcessEnv();

  // Reset environment variables as necessary
  beforeEach(testEnv.restore);
  afterAll(testEnv.restore);

  describe("registers config", () => {
    test("registers with configured env variables", () => {
      testEnv.set({
        LOG_HTTP_REQUESTS: "true",
      });

      const config = logConfig();

      expect(config.logHttpRequests).toBe(true);
    });
  });
});
