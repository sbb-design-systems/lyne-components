/**
 * Toggle a dataset boolean entry.
 *
 * @param element Element to set data attribute on.
 * @param name Name of data attribute.
 * @param condition Condition whether attribute should be set or removed.
 */
export function toggleDatasetEntry(element: HTMLElement, name: string, condition: boolean): void {
  if (condition) {
    element.dataset[name] = '';
  } else {
    delete element.dataset[name];
  }
}
