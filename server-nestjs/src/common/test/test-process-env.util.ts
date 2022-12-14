/**
 * Utilities for tests involving 'process.env'
 *
 * NOTE: Test blocks should reset environment variables before each test and after all tests!
 */
interface TestProcessEnv {
  /** Pre-test environment variables (deep clone) */
  original: NodeJS.ProcessEnv;
  /** Clear environment variables (for test) */
  clear: () => void;
  /** Remove a specific environment variable */
  remove: (key: string | string[]) => void;
  /**
   * Restore original environment variables (should do before each test and after all tests)
   *
   * @example
   * describe("registers config", () => {
   *   beforeEach(resetEnv);
   *   afterAll(resetEnv);
   * });
   */
  restore: () => void;
  /** Set/update a environment variables */
  set: (values: Record<string, string>) => void;
}

/** Provide utilities for tests involving 'process.env' */
export const testProcessEnv = (): TestProcessEnv => {
  const originalEnv: NodeJS.ProcessEnv = { ...process.env };

  const clearEnv = () => {
    process.env = {};
  };

  const removeEnv = (key: string | string[]) => {
    const keys = Array.isArray(key) ? key : [key];

    keys.forEach((key) => {
      delete process.env[key];
    });
  };

  const restoreEnv = () => {
    process.env = { ...originalEnv };
  };

  const setEnv = (values: Record<string, string>) => {
    Object.entries(values).forEach(([key, value]) => {
      process.env[key] = value;
    });
  };

  return {
    clear: clearEnv,
    original: originalEnv,
    remove: removeEnv,
    restore: restoreEnv,
    set: setEnv,
  };
};
