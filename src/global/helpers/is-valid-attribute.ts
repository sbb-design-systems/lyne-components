/**
 * Check if the provided attribute is present on the provided element and if it is set to true.
 * @param element The element to check.
 * @param attribute The attribute to be checked.
 */
export function isValidAttribute(element: HTMLElement, attribute: string): boolean {
  return element.hasAttribute(attribute) && element.getAttribute(attribute) !== 'false';
}
