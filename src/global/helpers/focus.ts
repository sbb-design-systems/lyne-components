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
        const lastFocusable = focusableElements.at(-1) as HTMLElement;

        const [pivot, next] = event.shiftKey
          ? [firstFocusable, lastFocusable]
          : [lastFocusable, firstFocusable];

        if (element.shadowRoot.activeElement === pivot || document.activeElement === pivot) {
          next.focus();
          event.preventDefault();
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
