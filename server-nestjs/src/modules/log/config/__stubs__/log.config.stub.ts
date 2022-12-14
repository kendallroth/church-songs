import { createConfigProviderFactory, createConfigStubFactory } from "@common/test";

import logConfig from "../log.config";

/** Stubbed 'LogConfig' for injection in test modules */
export const stubLogConfig = createConfigStubFactory<typeof logConfig>({
  logHttpRequests: false,
});

/** Stubbed 'LogConfig' provider for injection in test modules */
export const stubLogConfigProvider = createConfigProviderFactory(logConfig, stubLogConfig);
