const IGNORED_ELEMENTS = ['script', 'head', 'template', 'style'];

export class SbbInertHandler {
  private _modifiedElements = new Set<HTMLElement>();
  private _inertOverlays: HTMLElement[] = [];

  private get _currentOverlayIndex(): number {
    return this._inertOverlays.length - 1;
  }

  private get _currentOverlay(): HTMLElement {
    return this._inertOverlays[this._currentOverlayIndex];
  }

  /** Applies inert state to every other element on the page except the overlay. */
  public apply(overlay: HTMLElement): void {
    // Remove inert state from previous opened overlay
    if (this._inertOverlays.length) {
      this._removeInertAttributes();
    }

    this._inertOverlays.push(overlay);
    this._addInertAttributes();
  }

  public remove(overlay: HTMLElement, silent = false): void {
    if (this._currentOverlay !== overlay) {
      // If e.g. a component gets disconnected, it could be that it is not the top most.
      // In this case, we can directly remove it, as there is currently no inert state applied.
      if (this._inertOverlays.includes(overlay)) {
        this._inertOverlays.splice(this._inertOverlays.indexOf(overlay), 1);
      } else if (import.meta.env.DEV && !silent) {
        console.warn(
          'Trying to remove inert state of an overlay which never had an applied inert state.',
          overlay,
        );
      }

      return;
    }

    this._removeInertAttributes();
    this._inertOverlays.splice(this._currentOverlayIndex, 1);

    // If there is as previous opened overlay, set its inert state again.
    if (this._inertOverlays.length) {
      this._addInertAttributes();
    }
  }

  private _removeInertAttributes(): void {
    this._modifiedElements.forEach((element: HTMLElement): void => {
      if (!element) {
        return;
      }

      if (element.hasAttribute('data-sbb-inert')) {
        element.inert = false;
        element.removeAttribute('data-sbb-inert');
      }

      if (element.hasAttribute('data-sbb-aria-hidden')) {
        element.removeAttribute('aria-hidden');
        element.removeAttribute('data-sbb-aria-hidden');
      }
    });
    this._modifiedElements.clear();
  }

  private _addInertAttributes(): void {
    let element: Element | null = this._currentOverlay;

    while (element !== document.documentElement && element !== null) {
      Array.from((element?.parentElement ?? element?.getRootNode())?.childNodes ?? [])
        .filter(
          (child): child is HTMLElement =>
            child !== element &&
            child instanceof window.HTMLElement &&
            !IGNORED_ELEMENTS.includes(child.localName),
        )
        .forEach((element) => {
          this._modifiedElements.add(element);

          if (!element.inert) {
            element.inert = true;
            element.toggleAttribute('data-sbb-inert', true);
          }

          if (!element.hasAttribute('aria-hidden')) {
            element.setAttribute('aria-hidden', 'true');
            element.toggleAttribute('data-sbb-aria-hidden', true);
          }
        });

      // We need to pierce through Shadow DOM boundary
      element = element?.parentElement ?? (element?.getRootNode() as ShadowRoot)?.host ?? null;
    }
  }
}

export const sbbInertHandler = new SbbInertHandler();
