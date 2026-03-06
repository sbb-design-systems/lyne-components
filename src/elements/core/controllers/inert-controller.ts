import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type { SbbOpenCloseBaseElement } from '../base-elements.ts';

const IGNORED_ELEMENTS = ['script', 'head', 'template', 'style'];
const inertElements = new Set<HTMLElement>();
const exemptedElements = new Set<HTMLElement>();
const inertOverlays = new Set<HTMLElement>();

export class SbbInertController implements ReactiveController {
  public constructor(
    private _host: ReactiveControllerHost & SbbOpenCloseBaseElement,
    private _inertElements = inertElements,
    private _inertOverlays = inertOverlays,
    private _exemptedElements = exemptedElements,
  ) {
    this._host.addController?.(this);
  }

  public hostConnected(): void {
    if (this._host.isOpen) {
      this.activate();
    }
  }

  public hostDisconnected(): void {
    if (this.isInert()) {
      this.deactivate();
    }
  }

  /** Applies inert state to every other element on the page except the overlay. */
  public activate(): void {
    // Remove inert state from previous opened overlay
    if (this._inertOverlays.size) {
      this._removeAllInertAttributes();
    }

    this._inertOverlays.add(this._host);
    this._addAllInertAttributes();
  }

  /** Removes inert state. */
  public deactivate(): void {
    if (this._currentOverlay() !== this._host) {
      // If e.g. a component gets disconnected, it could be that it is not the top most.
      // In this case, we can directly remove it, as there is currently no inert state applied.
      if (this._inertOverlays.has(this._host)) {
        this._inertOverlays.delete(this._host);
      } else if (import.meta.env.DEV) {
        console.warn(
          'Trying to remove inert state of an overlay which never had an applied inert state.',
          this._host,
        );
      }

      return;
    }

    this._removeAllInertAttributes();
    this._inertOverlays.delete(this._host);

    // If there is as previous opened overlay, set its inert state again.
    if (this._inertOverlays.size) {
      this._addAllInertAttributes();
    }
  }

  /** Whether the assigned host is currently inert */
  public isInert(): boolean {
    return this._inertOverlays.has(this._host);
  }

  /** Temporarily removes all inert attributes from a given element. */
  public exempt(element: HTMLElement): void {
    if (this._inertElements.has(element) && !this._exemptedElements.has(element)) {
      this._removeInertAttributes(element);
      this._inertElements.delete(element);
      this._exemptedElements.add(element);
    }
  }

  /** Inerts an element currently exempted from inert. */
  public restoreAllExempted(): void {
    this._exemptedElements.forEach((e) => this._addInertAttributes(e));
    this._exemptedElements.clear();
  }

  private _currentOverlay(): HTMLElement | null {
    return [...this._inertOverlays].pop() ?? null;
  }

  private _removeAllInertAttributes(): void {
    this._inertElements.forEach((element: HTMLElement): void =>
      this._removeInertAttributes(element),
    );
    this._inertElements.clear();
  }

  private _removeInertAttributes(element: HTMLElement): void {
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
  }

  private _addAllInertAttributes(): void {
    let element: Element | null = this._currentOverlay();

    while (element !== document.documentElement && element !== null) {
      Array.from((element?.parentElement ?? element?.getRootNode())?.childNodes ?? [])
        .filter(
          (child): child is HTMLElement =>
            child !== element &&
            child instanceof window.HTMLElement &&
            !IGNORED_ELEMENTS.includes(child.localName) &&
            !child.classList.contains('sbb-live-announcer-element'),
        )
        .forEach((element) => {
          this._addInertAttributes(element);
        });

      // We need to pierce through Shadow DOM boundary
      element = element?.parentElement ?? (element?.getRootNode() as ShadowRoot)?.host ?? null;
    }
  }

  private _addInertAttributes(element: HTMLElement): void {
    this._inertElements.add(element);

    if (!element.inert) {
      element.inert = true;
      element.toggleAttribute('data-sbb-inert', true);
    }

    if (!element.hasAttribute('aria-hidden')) {
      element.setAttribute('aria-hidden', 'true');
      element.toggleAttribute('data-sbb-aria-hidden', true);
    }
  }
}
