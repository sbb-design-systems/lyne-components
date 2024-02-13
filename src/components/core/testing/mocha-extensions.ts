import type { Func, Suite, Test } from 'mocha';

/**
 * Skip the `describe` if the condition is not met
 */
export const describeIf = (
  condition: boolean,
  title: string,
  fn: (this: Suite) => void,
): Suite | void => (condition ? describe(title, fn) : describe.skip(title, fn));

/**
 * Skip the `test` if the condition is not met
 */
export const testIf = (condition: boolean, title: string, fn?: Func): Test =>
  condition ? test(title, fn) : test.skip(title, fn);
