export const LoggerService = jest.fn().mockReturnValue({
  critical: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  setContext: jest.fn(),
  warning: jest.fn(),
});
