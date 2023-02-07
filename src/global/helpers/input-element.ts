/**
 * Resolves the input element inside the shadow DOM of the given element.
 */
export function inputElement(element: HTMLElement): HTMLInputElement | null {
  return element.shadowRoot.querySelector('input');
}

/**
 * Resolves the input element inside the shadow DOM and calls the focus method if found.
 * Due to the `this` context handling with Safari when overwriting a method,
 * we need to specifically use a primitive function instead of a lexically bound arrow function.
 * The `this` inside the function will be bound to the context of the overwritten method.
 */
export function focusInputElement(options: FocusOptions): void {
  inputElement(this)?.focus(options);
}
