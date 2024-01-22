/**
 * Check if the provided attribute is present on the provided element and if it is set to true.
 * @param element The element to check.
 * @param attribute The attribute to be checked.
 */
export function isValidAttribute(element: Element, attribute: string): boolean {
  return element.hasAttribute(attribute) && element.getAttribute(attribute) !== 'false';
}

/**
 * Set the attribute only if value is not 'false'
 * @param element The element that will have the attribute
 * @param attribute The attribute name
 * @param value The attribute value
 */
export function setAttribute(element: HTMLElement, attribute: string, value?: any): void {
  if (!value) {
    element.removeAttribute(attribute);
    return;
  }

  if (typeof value === 'boolean') {
    element.setAttribute(attribute, '');
  } else {
    element.setAttribute(attribute, value);
  }
}

/**
 * Set multiple attributes
 * @param element The element that will have the attributes
 * @param attributes Attributes object
 */
export function setAttributes(element: HTMLElement, attributes?: Record<string, any>): void {
  if (!attributes) {
    return;
  }

  for (const [name, value] of Object.entries(attributes)) {
    setAttribute(element, name, value);
  }
}
