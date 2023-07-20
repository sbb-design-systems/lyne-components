import { findReferencedElement } from './find-referenced-element';

/**
 * Resolves the input element inside the shadow DOM of the given element.
 */
export function shadowInputElement(element: HTMLElement): HTMLInputElement | null {
  return element.shadowRoot.querySelector('input');
}

/**
 * Given a SbbDatepicker component, returns the related input reference, if it exists.
 * @param element The starting SbbDatepicker element.
 * @param trigger The id or the reference of the input.
 */
export function findInput(element: HTMLElement, trigger?: string | HTMLElement): HTMLInputElement {
  if (!trigger) {
    const parent = element.closest('sbb-form-field');
    return parent?.querySelector('input') as HTMLInputElement;
  }

  const input = findReferencedElement<HTMLInputElement>(trigger);
  return input ?? null;
}
