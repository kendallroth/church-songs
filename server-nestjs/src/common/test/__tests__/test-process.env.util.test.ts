import { testProcessEnv } from "../test-process-env.util";

/**
 * NOTE: During tests on 'process.env' utility functions, only use the utilities as part of tests.
 *         All other changes (for setup or comparisons) should be performed using 'process.env' to
 *         actually verify changes are being performed as expected.
 */
describe("testProcessEnv", () => {
  const originalEnv = { ...process.env };

  const rootTestEnv = testProcessEnv();

  // Reset environment variables as necessary, avoiding the system under test ('testProcessEnv')!
  beforeEach(() => {
    process.env = { ...originalEnv };
  });
  afterAll(() => {
    process.env = { ...originalEnv };
  });

  // NOTE: This test is important as all other tests/functionality is built around properly tracking
  //         the original 'process.env' variables!
  it("tracks original 'process.env' variables", () => {
    // Retracks 'testProcessEnv' after capturing 'process.env' to ensure state is entirely encapsulated
    //   in this test (no hooks), and tests via both a scalar and entire 'process.env' object.
    const originalEnv = { ...process.env };
    const originalNodeEnv = process.env.NODE_ENV;
    const subTestEnv = testProcessEnv();

    process.env.FAKE = "value";
    process.env.NODE_ENV = "wrong";

    expect(subTestEnv.original.NODE_ENV).toStrictEqual(originalNodeEnv);
    expect(subTestEnv.original).toStrictEqual(originalEnv);
  });

  it("can set 'process.env' variables", () => {
    const fakeValue = "value";
    const nodeEnvValue = "fake";

    rootTestEnv.set({ FAKE: fakeValue, NODE_ENV: nodeEnvValue });

    expect(process.env.FAKE).toBe(fakeValue);
    expect(process.env).toStrictEqual({
      ...rootTestEnv.original,
      FAKE: fakeValue,
      NODE_ENV: nodeEnvValue,
    });
  });

  it("can remove 'process.env' variables", () => {
    process.env.FAKE = "value";
    process.env.ANOTHER = "test";

    rootTestEnv.remove("FAKE");
    rootTestEnv.remove(["ANOTHER"]);

    expect(process.env.FAKE).toBe(undefined);
    expect(process.env.ANOTHER).toBe(undefined);
    expect(process.env).toStrictEqual(rootTestEnv.original);
  });

  it("can clear all 'process.env' variables", () => {
    rootTestEnv.clear();

    expect(process.env).toStrictEqual({});
  });

  // NOTE: Another important test that complements the test verifying it can track original state
  it("can restore original 'process.env' variables", () => {
    // Change some variables before capturing 'process.env', to further test restoration
    const beforeValue = "persists";
    process.env.BEFORE = beforeValue;
    const subTestEnv = testProcessEnv();
    process.env.FAKE = "thing";

    // Verify that changes were made before restoring old variables
    expect(process.env).not.toStrictEqual(subTestEnv.original);

    subTestEnv.restore();

    // Verify that 'process.env' is reset to the "original" captured state
    expect(process.env.BEFORE).toBe(beforeValue);
    expect(process.env.FAKE).toBe(undefined);
    expect(process.env).toStrictEqual(subTestEnv.original);
  });
});
