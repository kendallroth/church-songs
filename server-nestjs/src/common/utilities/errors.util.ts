/**
 * Assert that an unknown error derives from 'Error' (changes type after function call)
 *
 * Use to ensure that 'unknown' errors from try/catch blocks are actually derived from 'Error' class,
 *   to prevent invalidly accessing standard error properties (ie. 'message'). Invalid errors will
 *   be thrown as-is, and caught by the NestJS unhandled exception handler.
 *
 * @param  error Unknown error shape
 * @throws Original error if not derived from 'Error' class
 * @example
 * try {
 *   ...
 * } catch (e: unknown) {
 *   assertError(e);  // Will assert that 'e' is an 'Error' or throw otherwise
 *   console.log(e.message);
 * }
 */
// NOTE: Strange type syntax is necessary to fix 'Assertions require every name in the call...' error
//         when using "standard" TS assertion typing (ie. on right side of function vs left).
// Source: https://github.com/microsoft/TypeScript/pull/33622#issuecomment-575301357
export const assertError: (error: unknown) => asserts error is Error = (error: unknown) => {
  if (!(error instanceof Error)) {
    throw error;
  }
};
