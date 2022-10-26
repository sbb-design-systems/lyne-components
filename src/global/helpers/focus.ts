export const IS_FOCUSABLE_QUERY = `:is(button, [href], input, select, textarea, details, summary:not(:disabled), [tabindex], sbb-button, sbb-link, sbb-menu-action):not([disabled]):not([tabindex="-1"]):not([static])`;

/**
 * Determines the position of an element relative to a trigger element by evaluating
 * the optimal position based on the available space.
 *
 * @param event The keyboard event to check which keys have been pressed.
 * @param element The element within which to trap the focus.
 * @param firstFocusable The first focusable element.
 * @param lastFocusable The last focusable element.
 */
export function trapFocus(
  event: KeyboardEvent,
  element: HTMLElement,
  firstFocusable: HTMLElement,
  lastFocusable: HTMLElement
): void {
  if (event.key !== 'Tab') {
    return;
  }

  if (event.shiftKey) {
    // Shift + Tab
    if (
      element.shadowRoot.activeElement === firstFocusable ||
      document.activeElement === firstFocusable
    ) {
      lastFocusable.focus();
      event.preventDefault();
    }
  } else {
    // Tab
    if (
      element.shadowRoot.activeElement === lastFocusable ||
      document.activeElement === lastFocusable
    ) {
      firstFocusable.focus();
      event.preventDefault();
    }
  }
}
