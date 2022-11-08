export const IS_FOCUSABLE_QUERY = `:is(button, [href], input, select, textarea, details, summary:not(:disabled), [tabindex], sbb-button, sbb-link, sbb-menu-action):not([disabled]):not([tabindex="-1"]):not([static])`;

// Note: the use of this function for more complex scenarios (with many nested elements) may be expensive.
export function getFocusableElements(elements: HTMLElement[]): HTMLElement[] {
  const focusableEls = new Set<HTMLElement>();

  function getFocusables(elements: HTMLElement[]): void {
    for (const el of elements) {
      if (el.matches(IS_FOCUSABLE_QUERY)) {
        focusableEls.add(el);
      } else if (el.nodeName === 'SLOT') {
        getFocusables(Array.from((el as HTMLSlotElement).assignedElements()) as HTMLElement[]);
      } else if (Array.from(el.children).length) {
        getFocusables(Array.from(el.children) as HTMLElement[]);
      }
    }
  }
  getFocusables(elements);

  return [...focusableEls];
}

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
        const elementChildren: HTMLElement[] = Array.from(element.shadowRoot.querySelectorAll('*'));
        const focusableElements = getFocusableElements(elementChildren);
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
