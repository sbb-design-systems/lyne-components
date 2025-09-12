/**
 * Set the attribute only if value is not 'false', otherwise remove attribute.
 * @param element The element that will have the attribute
 * @param attribute The attribute name
 * @param value The attribute value
 */
export function setOrRemoveAttribute(element: HTMLElement, attribute: string, value?: any): void {
  if (!value) {
    element.removeAttribute(attribute);
  } else {
    element.setAttribute(attribute, value);
  }
}

/**
 * Add `value` to an attribute that accept a list of values. If the attribute is not set, it will be set to `value`.
 * @param element The element that will have the attribute
 * @param attribute The attribute name
 * @param value The value to add
 */
export function addToListAttribute(element: HTMLElement, attribute: string, value: string): void {
  setOrRemoveAttribute(
    element,
    attribute,
    `${element.getAttribute(attribute) ?? ''} ${value}`.trim(),
  );
}

/**
 * Remove `value` from an attribute list of values. If the attribute results empty, it will be removed.
 * @param element The element with the attribute
 * @param attribute The attribute name
 * @param value The value to remove from the list
 */
export function removeFromListAttribute(
  element: HTMLElement,
  attribute: string,
  value: string,
): void {
  setOrRemoveAttribute(
    element,
    attribute,
    element.getAttribute(attribute)?.replace(value, '').trim(),
  );
}
