/**
 * Checks if the body has the `sbb-lean` class.
 */
export function isLean(): boolean {
  return document.body.classList.contains('sbb-lean');
}
