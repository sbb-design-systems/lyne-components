import { isServer } from 'lit';

/**
 * This is a custom implementation.
 * In the `web-test-runner.config` we add data attributes to the body with additional information.
 */
export const isTestEnvironment = (): boolean => !isServer && 'testEnv' in globalThis;

/**
 * This is a custom implementation.
 * True if the `testEnvironment` meta tag has the `debug` attribute
 */
export const isDebugEnvironment = (): boolean =>
  !isServer && (globalThis as any).testEnv === 'debug';

/**
 * This is a custom implementation.
 * Returns true, if this is run in the SSR with hydration test group.
 */
export const isHydratedSsr = (): boolean =>
  !isServer && (globalThis as any).testGroup === 'e2e-ssr-hydrated';

/**
 * This is a custom implementation.
 * Returns true, if this is run in the SSR without hydration test group.
 */
export const isNonHydratedSsr = (): boolean =>
  !isServer && (globalThis as any).testGroup === 'e2e-ssr-non-hydrated';

/**
 * This is a custom implementation.
 * Returns true, if this is run in an SSR test group.
 */
export const isSsr = (): boolean => isHydratedSsr() || isNonHydratedSsr();
