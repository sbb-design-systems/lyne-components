import { isServer } from 'lit';

/**
 * Checks if the body has the `sbb-lean` class.
 */
export function isLean(): boolean {
  return !isServer && document.body.classList.contains('sbb-lean');
}
