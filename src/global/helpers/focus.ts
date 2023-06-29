export const IS_FOCUSABLE_QUERY = `:is(button, [href], input, select, textarea, details, summary:not(:disabled), [tabindex]):not([disabled]:not([disabled='false'])):not([tabindex="-1"])`;

// Note: the use of this function for more complex scenarios (with many nested elements) may be expensive.
export function getFocusableElements(
  elements: HTMLElement[],
  filterFunc?: (el: HTMLElement) => boolean
): HTMLElement[] {
  const focusableEls = new Set<HTMLElement>();

  function getFocusables(elements: HTMLElement[], filterFunc?: (el: HTMLElement) => boolean): void {
    for (const el of elements) {
      if (filterFunc?.(el)) {
        continue;
      }

      if (el.nodeName === 'SLOT') {
        getFocusables(
          Array.from((el as HTMLSlotElement).assignedElements()) as HTMLElement[],
          filterFunc
        );
        continue;
      }

      if (el.matches(IS_FOCUSABLE_QUERY)) {
        focusableEls.add(el);
      }

      if (el.children.length || el.shadowRoot?.children.length) {
        const children = Array.from(el.children).length
          ? (Array.from(el.children) as HTMLElement[])
          : (Array.from(el.shadowRoot.children) as HTMLElement[]);
        getFocusables(children, filterFunc);
      }
    }
  }
  getFocusables(elements, filterFunc);

  return [...focusableEls];
}

export class FocusTrap {
  private _controller = new AbortController();

  public trap(element: HTMLElement, filterFunc?: (el: HTMLElement) => boolean): void {
    element.addEventListener(
      'keydown',
      (event) => {
        if (event.key !== 'Tab') {
          return;
        }

        // Dynamically get first and last focusable element, as this might have changed since opening overlay
        const elementChildren: HTMLElement[] = Array.from(
          element.shadowRoot.children
        ) as HTMLElement[];
        const focusableElements = getFocusableElements(elementChildren, filterFunc);
        const firstFocusable = focusableElements[0] as HTMLElement;
        const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

        const [pivot, next] = event.shiftKey
          ? [firstFocusable, lastFocusable]
          : [lastFocusable, firstFocusable];

        if (
          (firstFocusable.getRootNode() as Document | ShadowRoot).activeElement === pivot ||
          (lastFocusable.getRootNode() as Document | ShadowRoot).activeElement === pivot
        ) {
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
