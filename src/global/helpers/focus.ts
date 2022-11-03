export const IS_FOCUSABLE_QUERY = `:is(button, [href], input, select, textarea, details, summary:not(:disabled), [tabindex], sbb-button, sbb-link, sbb-menu-action):not([disabled]):not([tabindex="-1"]):not([static])`;

export class FocusTrap {
  private _controller = new AbortController();

  public trap(element: HTMLElement): void {
    element.addEventListener(
      'keydown',
      (event) => {
        if (event.key !== 'Tab') {
          return;
        }

        // Dynamically get first and last focusable element, as this might have changed since opening overlay
        const focusableElements = Array.from(element.querySelectorAll(IS_FOCUSABLE_QUERY));
        const firstFocusable = focusableElements[0] as HTMLElement;
        const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

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
      },
      { signal: this._controller.signal }
    );
  }

  public disconnect(): void {
    this._controller.abort();
    this._controller = new AbortController();
  }
}
