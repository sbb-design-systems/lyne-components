/**
 * Strips/removes HTML tags from a given value.
 * @param value Value to strip HTML tags from.
 */
export function stripHTML(value: string): string {
  return new DOMParser().parseFromString(value, 'text/html').body.textContent;
}
