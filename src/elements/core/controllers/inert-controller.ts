import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type { SbbOpenCloseBaseElement } from '../base-elements/open-close-base-element.ts';

const IGNORED_ELEMENTS = ['script', 'head', 'template', 'style', 'link'];

const DEEP_IGNORED_ELEMENTS_SELECTOR =
  'sbb-toast,.sbb-overlay-outlet,.sbb-live-announcer-element,.cdk-live-announcer-element,.cdk-overlay-container';
const inertElements = new Set<HTMLElement>();
const exemptedElements = new Set<HTMLElement>();
const inertOverlays = new Set<HTMLElement>();

export class SbbInertController implements ReactiveController {
  // TODO: Convert parameters to just a second options parameter object with optional parameters.
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

  /**
   * Applies the inert state to every element on the page except the current
   * overlay (and its ancestors).
   *
   * This implementation must carefully consider performance, as it involves
   * traversing the entire DOM tree and managing inert states for potentially
   * a huge amount of elements (potentially >10000).
   * See e.g. https://github.com/sbb-design-systems/lyne-components/issues/5273
   */
  private _addAllInertAttributes(): void {
    const currentOverlay: Element | null = this._currentOverlay();
    const ignoredElements: Element[] = currentOverlay ? [currentOverlay] : [];
    // Collect all ignored elements by iterating the DOM exactly once, including
    // Shadow DOMs.
    const queue: ParentNode[] = [document.documentElement];
    while (queue.length > 0) {
      for (const element of queue.shift()!.querySelectorAll('*')) {
        if (element.matches(DEEP_IGNORED_ELEMENTS_SELECTOR)) {
          ignoredElements.push(element);
        }
        if (element.shadowRoot) {
          queue.push(element.shadowRoot);
        }
      }
    }

    // Ignored elements (matching `DEEP_IGNORED_ELEMENTS_SELECTOR`)
    // must never be inert, no matter how deeply nested they are within the tree (looking
    // from `document.documentElement` down). As inert is inherited by descendants, simply excluding
    // them from being marked inert themselves is not enough if one of their ancestors is inert. In
    // that case, the whole path from the ignored element up to `element` needs to stay "carved
    // free", while every other branch along that path is properly inert instead.
    const ignoredElementPaths: EventTarget[] = [];
    const eventHandler = (e: Event): unknown => ignoredElementPaths.push(...e.composedPath());
    for (const element of ignoredElements) {
      element.addEventListener('ɵinert', eventHandler, { once: true });
      element.dispatchEvent(new Event('ɵinert', { composed: true }));
    }

    const ignoredElementSet = new Set(ignoredElementPaths);
    const inertElements = new Set<Element>();
    for (const element of ignoredElementSet) {
      for (const localElement of (element as Node).parentNode?.childNodes ?? []) {
        if (
          localElement.nodeType === Node.ELEMENT_NODE &&
          !IGNORED_ELEMENTS.includes((localElement as Element).localName) &&
          !ignoredElementSet.has(localElement)
        ) {
          // We use a Set to avoid processing duplicate elements, as multiple
          // ignored elements may share the same parent.
          inertElements.add(localElement as Element);
        }
      }
    }

    for (const element of inertElements) {
      this._addInertAttributes(element as HTMLElement);
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
