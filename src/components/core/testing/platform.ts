import { isServer } from 'lit';

/**
 * This is a custom implementation.
 * In the `web-test-runner.config` we add a meta tag with some useful meta-data
 */
export const isTestEnvironment = (): boolean =>
  !isServer && !!document.head.querySelector('meta[name="testEnvironment"]');

/**
 * This is a custom implementation.
 * True if the `testEnvironment` meta tag has the `debug` attribute
 */
export const isDebugEnvironment = (): boolean =>
  !isServer &&
  isTestEnvironment() &&
  !!document.head.querySelector('meta[name="testEnvironment"]')?.hasAttribute('debug');

/**
 * This is a custom implementation.
 * Returns true, if this is run in the SSR with hydration test group.
 */
export const isHydratedSsr = (): boolean =>
  !isServer &&
  document.head.querySelector('meta[name="testGroup"]')?.getAttribute('content') ===
    'e2e-ssr-hydrated';

/**
 * This is a custom implementation.
 * Returns true, if this is run in the SSR without hydration test group.
 */
export const isNonHydratedSsr = (): boolean =>
  !isServer &&
  document.head.querySelector('meta[name="testGroup"]')?.getAttribute('content') ===
    'e2e-ssr-non-hydrated';

/**
 * This is a custom implementation.
 * Returns true, if this is run in an SSR test group.
 */
export const isSsr = (): boolean => isHydratedSsr() || isNonHydratedSsr();
