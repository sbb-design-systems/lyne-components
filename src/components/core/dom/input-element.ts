import { findReferencedElement } from './find-referenced-element';

/**
 * Resolves the input element inside the shadow DOM of the given element.
 */
export function findShadowInput(element: HTMLElement): HTMLInputElement | null {
  return element.shadowRoot.querySelector('input');
}

/**
 * Given an element, returns the related input reference, if it exists respecting following priority.
 * 1. Input field in `sbb-form-field` (if trigger is undefiend)
 * 2. Input referenced by id (trigger is string)
 * 3. Input referenced directly (trigger is HTMLElement)
 * @param element The starting SbbDatepicker element.
 * @param trigger The id or the reference of the input.
 */
export function findInput(
  element: HTMLElement,
  trigger?: string | HTMLElement,
): HTMLInputElement | null {
  if (!trigger) {
    const parent = element.closest('sbb-form-field');
    return parent?.querySelector('input') as HTMLInputElement | null;
  }

  return findReferencedElement<HTMLInputElement>(trigger);
}
