import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type { SbbOpenCloseBaseElement } from '../base-elements/open-close-base-element.js';
import type { SbbOpenedClosedState } from '../interfaces/types.js';

const IGNORED_ELEMENTS = ['script', 'head', 'template', 'style'];
const inertElements = new Set<HTMLElement>();
const inertOverlays: HTMLElement[] = [];

export class SbbInertController implements ReactiveController {
  public constructor(
    private _host: ReactiveControllerHost & SbbOpenCloseBaseElement,
    private _inertElements = inertElements,
    private _inertOverlays = inertOverlays,
  ) {
    this._host.addController?.(this);
  }

  public hostConnected(): void {
    if (
      // TODO: Find a better solution than type cheating (`state` is protected)
      (
        this._host as ReactiveControllerHost &
          SbbOpenCloseBaseElement & { state: SbbOpenedClosedState }
      ).state === 'opened'
    ) {
      this.activate();
    }
  }

  public hostDisconnected(): void {
    this.deactivate(true);
  }

  /** Applies inert state to every other element on the page except the overlay. */
  public activate(): void {
    // Remove inert state from previous opened overlay
    if (this._inertOverlays.length) {
      this._removeInertAttributes();
    }

    this._inertOverlays.push(this._host);
    this._addInertAttributes();
  }

  /** Removes inert state. */
  public deactivate(silent = false): void {
    if (this._currentOverlay() !== this._host) {
      // If e.g. a component gets disconnected, it could be that it is not the top most.
      // In this case, we can directly remove it, as there is currently no inert state applied.
      if (this._inertOverlays.includes(this._host)) {
        this._inertOverlays.splice(this._inertOverlays.indexOf(this._host), 1);
      } else if (import.meta.env.DEV && !silent) {
        console.warn(
          'Trying to remove inert state of an overlay which never had an applied inert state.',
          this._host,
        );
      }

      return;
    }

    this._removeInertAttributes();
    this._inertOverlays.splice(this._currentOverlayIndex(), 1);

    // If there is as previous opened overlay, set its inert state again.
    if (this._inertOverlays.length) {
      this._addInertAttributes();
    }
  }

  private _currentOverlayIndex(): number {
    return this._inertOverlays.length - 1;
  }

  private _currentOverlay(): HTMLElement {
    return this._inertOverlays[this._currentOverlayIndex()];
  }

  private _removeInertAttributes(): void {
    this._inertElements.forEach((element: HTMLElement): void => {
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
    this._inertElements.clear();
  }

  private _addInertAttributes(): void {
    let element: Element | null = this._currentOverlay();

    while (element !== document.documentElement && element !== null) {
      Array.from((element?.parentElement ?? element?.getRootNode())?.childNodes ?? [])
        .filter(
          (child): child is HTMLElement =>
            child !== element &&
            child instanceof window.HTMLElement &&
            !IGNORED_ELEMENTS.includes(child.localName),
        )
        .forEach((element) => {
          this._inertElements.add(element);

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
