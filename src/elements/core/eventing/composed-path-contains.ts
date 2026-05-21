/**
 * Check if there is an element in the composed path that has 'attribute'
 *
 * @param event The event object
 * @param condition The condition callback to check for each element in the composed path. If it returns true, the element will be returned.
 * @param host The boundary where the path will be cut, endElement excluded. If null or not present, the whole path will be used.
 * @returns The element that has 'attribute', undefined otherwise.
 */
export function composedPathContains(
  event: Event,
  condition: (element: HTMLElement) => boolean,
  host: Element | null,
): HTMLElement | null {
  for (const element of event.composedPath()) {
    if (!(element instanceof window.HTMLElement)) {
      continue;
    }
    if (element === host) {
      return null;
    } else if (condition(element)) {
      return element;
    }
  }
  return null;
}
