import { isServer } from 'lit';

/**
 * Checks if the body has the `sbb-lean` class.
 */
export function isLean(): boolean {
  return !isServer && document.documentElement.classList.contains('sbb-lean');
}
